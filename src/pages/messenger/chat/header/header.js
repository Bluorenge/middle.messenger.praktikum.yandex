import Handlebars from 'handlebars/dist/handlebars.runtime';
import template from './header.hbs';
import '../action-popup/action-popup';

Handlebars.registerPartial('header', template);
