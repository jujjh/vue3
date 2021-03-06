import { h, render } from 'vue'
import toastComponent from './toastComponent'

export default {
    install: (app) => {
        const body = document.querySelector('body')

        const show = (opt) => {
            let toast = null
            const props = {
                message: '',
                icon: 'check-circle',
                delay: 3000,
                color: 'success',
            }

            if (typeof opt == 'object') {
                if (opt.delay != null && opt.delay != undefined) {
                    props.delay = opt.delay
                }

                if (opt.color != null && opt.color != undefined) {
                    props.color = opt.color
                }

                switch (props.color) {
                    case 'warning':
                        props.icon = 'exclamation-circle'
                    break
                    case 'info':
                        props.icon = 'info-circle'
                    break
                    case 'error':
                        props.icon = 'times'
                    break
                }

                props.message = opt.message
            } else {
                props.message = opt
            }

            if (toast == null) {
                toast = h(toastComponent, props)
                //만들고
                render(toast, body)
                //랜더링해줌
            } else {
                toast.component.props = props
                //
            }

            toast.component.exposed.show()
            //쇼를 익스포즈를 했기때문에 사용가능함.
        }

        app.config.globalProperties.$toast = show
        app.provide('toast', show)
    }
}