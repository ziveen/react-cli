const path = require('path')
const when = (condition, value, callback) => (condition ? value : callback)

module.exports = {
    prepare() {
        if(this.outDir === process.cwd()) {
            throw this.createError(
                `You can't create project in current directory`
            )
        }
    },
    prompts() {
        return [
            {
                name: 'type',
                message: 'Select the type you want (js or ts)',
                type: 'list',
                choices: [
                    {
                        name: 'javascript',
                        value: 'js'
                    },
                    {
                        name: 'typescript',
                        value: 'ts'
                    }
                ]
            }
        ]
    },
    actions() {
        const { type } = this.answers
        
        return [
            {
                type: 'add',
                templateDir: `templates/${type === 'js' ? 'main' : 'ts' }`,
                files: '**'
            }
        ]
    },
    async completed() {
        this.gitInit()
        await this.npmInstall()

        this.showProjectTips()

        const logCd = () => {
        if (this.outDir !== process.cwd()) {
            console.log(
            `${this.chalk.bold('cd')} ${this.chalk.cyan(
                path.relative(process.cwd(), this.outDir)
            )}`
            )
        }
        }

        this.logger.tip(`To start run storybook, run following commands:`)
        logCd()
        console.log(
        `${this.chalk.bold(this.npmClient)} ${this.chalk.cyan('run storybook')}`
        )
    }
}