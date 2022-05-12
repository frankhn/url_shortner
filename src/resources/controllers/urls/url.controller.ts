import { asyncWrapper, responseWrapper } from "../../../resources/helpers";
import { Url } from "../../../entity/url.entity";
import { Request, Response } from "../../../types/express";
import { BAD_REQUEST, OK } from "../../../constants/statusCodes";
import { NextFunction } from "express";
import { shortCodeGenerator } from "../../../resources/helpers/shortcode";

export class UrlController {

    public createOne(req: Request, res: Response) {
        const { body: { url, shortcode }, currentUrl, DbConnection } = req;
        return asyncWrapper(res, async () => {
            let uniqueShortCode = shortcode
            if (currentUrl || !shortcode) {
                uniqueShortCode = shortCodeGenerator()
            }
            const repository = DbConnection.getRepository(Url);
            const data = await repository.save({
                shortcode: uniqueShortCode,
                url,
                click: 0
            });
            return responseWrapper({
                res,
                message: 'Success',
                status: OK,
                data,
            });
        });
    }

    public getOneByShortCode(req: Request, res: Response, next: NextFunction) {
        const { body, params, DbConnection } = req;
        const shortcode = body.shortcode || params.shortcode || undefined
        return asyncWrapper(res, async () => {
            if (shortcode) {
                const repository = DbConnection.getRepository(Url);
                const data = await repository.findOne({
                    where: { shortcode }
                });
                req.currentUrl = data
            }
            next()
        });
    }

    public redirectToMainUrl(req: Request, res: Response) {
        const { currentUrl, DbConnection } = req;
        return asyncWrapper(res, async () => {
            const repository = DbConnection.getRepository(Url);
            await repository.save({
                ...currentUrl,
                click: currentUrl.click + 1
            })
            res.writeHead(302, {
                'location': `${currentUrl.url}`
            })
            res.end()
        });
    }

    public getCurrentUrlStats(req: Request, res: Response) {
        const { currentUrl } = req;
        return asyncWrapper(res, async () => {
            return responseWrapper({
                res,
                message: 'Success',
                status: OK,
                data: currentUrl
            });
        });
    }
    public validationInvalidRecord(req: Request, res: Response, next: NextFunction) {
        const { currentUrl } = req;
        if (!currentUrl) {
            return asyncWrapper(res, async () => {
                return responseWrapper({
                    res,
                    message: 'Record not Found',
                    status: BAD_REQUEST,
                });
            });
        }
        next();
    }

}

export default new UrlController();
