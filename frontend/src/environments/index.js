import environmentDev from './environment';
import environmentProd from './environment.prod.js';

//! Change the environmentDev to environmentProd

const production = false;

const environment = production ? environmentProd : environmentDev;

export default environment;
