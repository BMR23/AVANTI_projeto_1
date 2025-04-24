const runSearchLg = document.querySelector("#run_search")
const inputWrapperLg = runSearchLg.parentElement
const menuLinks = document.querySelector("#menu-links")


runSearchLg.addEventListener('click', () => showSearch(inputWrapperLg, true))

inputWrapperLg.addEventListener('keydown', e => {
    if (e.key === "Enter") showSearch(inputWrapperLg, true)
})

const runSearchSm = document.querySelector("#run_search_sm")
const inputWrapperSm = runSearchSm.parentElement

runSearchSm.addEventListener('click', () => showSearch(inputWrapperSm))

inputWrapperSm.addEventListener('keydown', e => {
    if (e.key === "Enter") showSearch(inputWrapperSm)
})

var timeoutId = null

function showSearch(wrapper, lg = false) {
    if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
    const previousSearch = wrapper.querySelector('#searchedTextWrapper')
    if (previousSearch) previousSearch.remove()

    const inputSearch = wrapper.querySelector('input')
    
    if (inputSearch.value == '') {
        menuLinks.classList.remove('mt-7')
        return
    }

    const searchedTextWrapper = document.createElement('nav')
    searchedTextWrapper.id = 'searchedTextWrapper'
    const searchedText = document.createElement('nav')
    searchedText.id = 'searchedText'
    searchedText.textContent = `Você buscou por: '${inputSearch.value}'`
    
    searchedTextWrapper.appendChild(searchedText)
    wrapper.appendChild(searchedTextWrapper)

    if (lg) menuLinks.classList.add('mt-7')
    else wrapper.classList.add('mb-7')

    timeoutId = setTimeout(() => {
        menuLinks.classList.remove('mt-7')
        wrapper.classList.remove('mb-7')
        const previousSearch = wrapper.querySelector('#searchedTextWrapper')
        if (previousSearch) previousSearch.remove()
    }, 8000)
}