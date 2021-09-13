window.addEventListener('load', () => {
    const width = window.innerWidth,
        burger = document.querySelector('.js-open-menu')

    if (burger && width <= 600) {
        console.log('sdfsdfs')
        burger.addEventListener('click', (e) => {
            burger.classList.toggle('opened')
            document.querySelector('body').classList.toggle('body--menu-opened')
            document.querySelector('body').classList.toggle('body--overflow')
        })

        document.addEventListener('mouseup', (e) => {
            if (document.querySelector('body').classList.contains('body--menu-opened')) {

                if (!document.querySelector('header').contains(e.target)) {
                    burger.click()
                }
            }
        })
    }

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