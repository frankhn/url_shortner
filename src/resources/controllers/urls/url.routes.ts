import { Router } from 'express';
import urlController from './url.controller';
import * as validations from './url.validation'

const routes = Router();

routes
    .get(
        ['/:shortcode'],
        validations.getStats,
        urlController.getOneByShortCode,
        urlController.validationInvalidRecord,
        urlController.redirectToMainUrl
    )

routes
    .get(
        ['/:shortcode/stats'],
        validations.getStats,
        urlController.getOneByShortCode,
        urlController.getCurrentUrlStats
    );

routes
    .post(
        ['/submit'],
        validations.createOne,
        urlController.getOneByShortCode,
        urlController.createOne
    );

export default routes;
