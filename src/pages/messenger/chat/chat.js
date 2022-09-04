import Handlebars from 'handlebars/dist/handlebars.runtime';
import template from './chat.hbs';
import './header/header';
import './message/message';
import './send-form/send-form';

Handlebars.registerPartial('chat', template);
