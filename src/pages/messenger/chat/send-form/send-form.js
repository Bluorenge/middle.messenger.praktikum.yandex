import Handlebars from 'handlebars/dist/handlebars.runtime';
import template from './send-form.hbs';
import '../action-popup/action-popup';

Handlebars.registerPartial('send-form', template);
