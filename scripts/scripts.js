window.addEventListener('load', () => {
    console.group()
    console.log('+10 - вёрстка валидная https://validator.w3.org/nu/?doc=https%3A%2F%2Fallyksander.github.io%2Frsschool-cv%2F')
    console.log('+10 - вёрстка семантическая (main, article, section, header, footer, nav, figure, figcaption, picture, h1, h2, h3)')
    console.log('+10 - для оформления СV используются css-стили')
    console.log('+10 - контент размещается в блоке, который горизонтально центрируется на странице')
    console.log('+10 - вёрстка адаптивная')
    console.log('+10 - есть адаптивное бургер-меню. Ссылки в пунктах меню ведут на основные разделы CV. При кликах по пунктам меню реализована плавная прокрутка по якорям. При уменьшении ширины экрана меню становится адаптивным')
    console.log('+10 - на странице СV присутствует изображение')
    console.log('+10 - контакты для связи и перечень навыков оформлены в виде списка ul > li')
    console.log('+10 - CV содержит контакты для связи, краткую информацию о себе, перечень навыков, информацию об образовании и уровне английского')
    console.log('+10 - CV содержит пример вашего кода')
    console.log('+10 - CV содержит изображения-ссылки на выполненные вами проекты. При клике по изображению страница проекта открывается в новой вкладке. У каждого проекта есть название, небольшое описание, указан перечень используемых технологий')
    console.log('+10 - CV выполнено на английском языке')
    console.log('+10 - выполнены требования к Pull Request: есть ссылка на задание, скриншот страницы СV, ссылка на деплой страницы CV на GitHub Pages, выполнена самооценка (самооценку расписываем по пунктам критериев оценки, указывая балл за каждый пункт)')
    console.log('- есть видеорезюме автора CV на английском языке')
    console.log('+10 - дизайн, оформление, качество выполнения CV не ниже чем в примерах CV, приведённых в материалах к заданию')
    console.groupEnd()

    const width = window.innerWidth,
        burger = document.querySelector('.js-open-menu')

    if (burger) {
        burger.addEventListener('click', (e) => {
            burger.classList.toggle('opened')
            document.querySelector('body').classList.toggle('body--menu-opened')
            document.querySelector('body').classList.toggle('body--overflow')
        })
    }


    document.addEventListener('mouseup', (e) => {
        if (document.querySelector('body').classList.contains('body--menu-opened')) {

            if (!document.querySelector('header').contains(e.target)) {
                burger.click()
            }
        }
    })

    const anchors = document.querySelectorAll('.js-menu [href*="#"]')
    if (anchors.length) {
        anchors.forEach(function (item) {
            item.addEventListener('click', function (e) {
                e.preventDefault()

                const parentLink = item.parentNode,
                    linkClientTop = parentLink.getBoundingClientRect().top,
                    docScrollTop = document.documentElement.scrollTop,
                    linkOffsetTop = linkClientTop + docScrollTop,
                    targetOffsetTop = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + docScrollTop - document.querySelector('header').offsetHeight - 10,
                    different = targetOffsetTop - linkOffsetTop

                animate({
                    duration: 1000,
                    timing(timeFraction) {
                        return Math.pow(timeFraction, 2)
                    },
                    draw(progress) {
                        window.scrollTo(0, docScrollTop + progress * (linkClientTop + different))
                    }
                })

                burger.click()
            })
        })
    }

    const acc = document.querySelectorAll('.js-acc')
    if (acc.length) {
        acc.forEach(
            item => {
                const dropdown = item.querySelector('.js-acc-dropdown'),
                    btn = item.querySelector('.js-acc-btn'),
                    heightdropdown = dropdown.offsetHeight

                dropdown.style.height = '0px'

                btn.addEventListener('click', () => {
                    item.classList.toggle('opened')
                    dropdown.classList.toggle('opened')

                    if (item.classList.contains('opened')) {
                        animate({
                            duration: 500,
                            timing(timeFraction) {
                                return timeFraction
                            },
                            draw(progress) {
                                dropdown.style.height = progress * heightdropdown + 'px'
                            }
                        })
                        setTimeout(() => {
                            dropdown.removeAttribute('style')
                        }, 300)
                    } else {
                        animate({
                            duration: 500,
                            timing(timeFraction) {
                                return timeFraction;
                            },
                            draw(progress) {
                                let antiProgress = 1 - progress
                                dropdown.style.height = antiProgress * heightdropdown + 'px'
                            }
                        })
                    }
                })
            }
        )
    }

    hljs.highlightAll()
})

function getSiblings(elem) {
    let siblings = [],
        sibling = elem

    while (sibling.previousSibling) {
        sibling = sibling.previousSibling
        sibling.nodeType == 1 && siblings.push(sibling)
    }

    sibling = elem

    while (sibling.nextSibling) {
        sibling = sibling.nextSibling
        sibling.nodeType == 1 && siblings.push(sibling)
    }

    return siblings
}

function animate({ duration, timing, draw }) {
    let start = performance.now()

    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration
        if (timeFraction > 1) timeFraction = 1

        let progress = timing(timeFraction)
        draw(progress)

        if (timeFraction < 1) {
            requestAnimationFrame(animate)
        }
    })
}