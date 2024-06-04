import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('../../training-main/training-main.module').then((m) => m.TrainingMainModule)
    },


];
