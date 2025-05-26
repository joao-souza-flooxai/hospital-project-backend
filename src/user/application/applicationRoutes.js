import {applicationController} from './applicationController.js';
import { authMiddleware } from '../../auth/authMiddleware.js';
export default async function applicationRoutes(app) {

  app.addHook('onRequest', authMiddleware()); 

  app.post('/user/application', applicationController.create);
  app.get('/user/applications', applicationController.getMyApplications);
  app.get('/user/application/:id', applicationController.getById);
  app.delete('/user/application/:id', applicationController.delete);
};
