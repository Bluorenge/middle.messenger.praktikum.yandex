import get from './get';

export default class Templator {
    VARIABLE_REGEXP = /\{\{(.*?)\}\}/gi;
    LOOP_REGEXP = /\{\#each[^.]*?\{\{\/each\}/gi;
    LOOP_VARIABLE = /\w\s+(.*)\}\}/;

    constructor(template) {
        this._template = template;
    }

    compile(context) {
        return this._compileTemplate(context);
    }

    _compileTemplate = (context) => {
        let tmpl = this._template;
        let key = null;
        const varExp = this.VARIABLE_REGEXP;
        const loopExp = this.LOOP_REGEXP;
        const loopVar = this.LOOP_VARIABLE;

        while ((key = loopExp.exec(tmpl))) {
            const loopValue = loopVar.exec(key[0]);
            console.log('key: ', key);

            if (loopValue[1]) {
                const tmplValue = loopValue[1].trim();
                const data = get(context, tmplValue);
                console.log('data: ', data);

                if (Array.isArray(data)) {
                    for (let item of data) {
                    }
                }

                tmpl = tmpl.replace(new RegExp(key[0], 'gi'), data);
            } else {
            }
        }
        while ((key = varExp.exec(tmpl))) {
            console.log('key[1]: ', key);
            if (key[1]) {
                const tmplValue = key[1].trim();
                const data = get(context, tmplValue);

                tmpl = tmpl.replace(new RegExp(key[0], 'gi'), data);
            }
        }

        return tmpl;
    };

    _compileEachLoop(context) {
        const loopExp = this.LOOP_REGEXP;
        const match = loopExp.exec(tmpl);
        const data = get(context, tmplValue);

        if (Array.isArray(context)) {
            // 1. Извлечь подстроку
            // 2. Заменить в ней переменные
            // 3. Подставить её в шаблон
            for (let item of context) {
                console.log(item);
            }
        } else {
            // console.log(new RegExp(key[0], 'gi'));
        }
    }
}
