window.addEventListener('load', () => {
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