const promptRecursive = require('inquirer-recursive');
const { inputRequired } = require('./config/plop/utils/utils');

module.exports = (plop) => {
  plop.setPrompt('recursive', promptRecursive);

  plop.setGenerator('add:store', {
    description: 'store generation logic',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter store name',
        validate: inputRequired('name'),
      },
      {
        type: 'recursive',
        name: 'constants',
        message: 'Would you like to add constant?',
        prompts: [
          {
            type: 'input',
            name: 'name',
            message: 'Enter constant name',
            validate: inputRequired('name'),
          },
        ],
      },
      {
        type: 'recursive',
        name: 'sagas',
        message: 'Would you like to add saga?',
        prompts: [
          {
            type: 'input',
            name: 'name',
            message: 'Enter saga name',
            validate: inputRequired('name'),
          },
          {
            type: 'confirm',
            name: 'hasWatcher',
            message: 'Has watcher?',
            default: true,
          },
        ],
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/client/store/reducers/{{name}}',
        base: './config/plop/templates/store/',
        templateFiles: ['./config/plop/templates/store/*.js.hbs'],
      },
    ],
  });
};
