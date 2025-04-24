// tailwindcss-language-server: enable

// listCategories.addEventListener('mouseenter', showMore)
// listCategories.addEventListener('click', showMore)  
// Preciso adicionar para os FILHOS
function classesAdd(element, stringClasses, separador = ' ') {
    const classes = stringClasses.split(separador).map(classe => classe.trim());
    element.classList.add(...classes);
}

function removeDepartmentsFocus(list) {
    Array.from(list.children).forEach((department) => {
        const previousFocus = department.classList.contains('item-focus')
        if (previousFocus) department.classList.remove('item-focus');
    });
}

function listCategories() {
    const categoriesListWrapper = document.createElement('div')
    categoriesListWrapper.className = `categoriesListWrapper`

    const titles = ['Categoria', 'Categoria', 'Categoria'];
    const items = () => Array(7).fill('Categoria');

    titles.forEach(title => {
        const categoryList = document.createElement('ul')
        const categoryElementTitle = document.createElement('li')
        const categoryTitle = document.createElement('h3')
        categoryTitle.textContent = title

        categoryElementTitle.appendChild(categoryTitle);
        categoryList.appendChild(categoryElementTitle)

        items().forEach(item => {
            const categoryElement = document.createElement('li')
            categoryElement.textContent = item
            categoryList.appendChild(categoryElement)
        })
        categoriesListWrapper.appendChild(categoryList)
    })
    return categoriesListWrapper
}

// const addChildrenCategories = (departmentElement) => {
function departmentCategoriesExpander(department, isCopy) {

    const categoriesWrapper = document.createElement('div')
    classesAdd(categoriesWrapper, 'categoriesWrapper')
    categoriesWrapper.id = `${department.id}-categories`

    if (!isCopy) {
        const departmentTitle = document.createElement('h2')
        departmentTitle.textContent = department.textContent
        categoriesWrapper.appendChild(departmentTitle)
    }

    const categoriesListWrapper = listCategories()
    categoriesWrapper.appendChild(categoriesListWrapper)

    return categoriesWrapper;
}

const showCategories = (department, isCopy=false) => {
    if (wait) return
    wait = true

    if (!menuLinks.classList.contains('addEvent')) runReset()
    
    if (!isCopy){
        const cloneListDepartments = document.querySelector('#cloneListDepartments')
        if (cloneListDepartments) {
            cloneListDepartments.removeEventListener('click', e => showCategories(e.target, true))
            cloneListDepartments.removeEventListener('mouseenter', e => showCategories(e.target, true))
            cloneListDepartments.remove()
        }
    }
    
    setTimeout(() => wait = false, 51)
        
    const categoriesWrapperElement = document.querySelector('.categoriesWrapper')

    if (categoriesWrapperElement) {
        const wasItCopy = categoriesWrapperElement.id.includes('copy')
        const sameDepartment = categoriesWrapperElement.id.includes(department.id)
        if (wasItCopy & sameDepartment) return
    }

    const categoriesWrapperWasBuilt = departmentCategories.contains(categoriesWrapperElement)
    if (categoriesWrapperWasBuilt) categoriesWrapperElement.remove()

    removeDepartmentsFocus(listDepartments)
    const cloneListDepartments = document.querySelector('#cloneListDepartments')
    if (cloneListDepartments) removeDepartmentsFocus(cloneListDepartments)

    classesAdd(department, 'item-focus')
    
    const categoriesWrapper = departmentCategoriesExpander(department, isCopy)
    
    containerDepartments.classList.remove('hidden')
    
    setTimeout(
        () => classesAdd(containerDepartments, 'max-h-expanded border-2 mt-4'), 2
    )
    timeoutId = setTimeout(
        () => departmentCategories.appendChild(categoriesWrapper), 50
    )
}

function runReset() {
    if (menuLinks.classList.contains('addEvent')) return
    
    menuLinks.classList.add('addEvent')

    const reset = () => {
        wait = true
        if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
          }
      
        const categoriesWrapper = document.querySelector('.categoriesWrapper')
        if (categoriesWrapper) categoriesWrapper.remove()
        const cloneListDepartments = document.querySelector('#cloneListDepartments')
        if (cloneListDepartments) cloneListDepartments.remove()
      
        setTimeout(() => {
          containerDepartments.classList.remove('max-h-expanded', 'border-2', 'mt-4');
          removeDepartmentsFocus(listDepartments)
        }, 2)

        setTimeout(() => {
          containerDepartments.classList.add('hidden');
          menuLinks.classList.remove('addEvent');
          menuLinks.removeEventListener('mouseleave', reset);
          wait = false
      
        }, 400);
      }
      
    menuLinks.addEventListener('mouseleave', reset)
}

var timeoutId = null
var wait = false;

const departmentCategories = document.querySelector("#department_categories")
const AllDepartmentsCategories = document.querySelector('#all_departments_categories')
const listDepartments = document.querySelector('#list_departments')
const containerDepartments = document.querySelector("#container-departments")
const menuLinks = document.querySelector("#menu-links")

listDepartments.childNodes.forEach((department) => {
    department.addEventListener('mouseenter', e => showCategories(e.target))
    department.addEventListener('click', e => showCategories(e.target))
})

function cloneDepartments() {
    const cloneListDepartments = listDepartments.cloneNode(true)
    cloneListDepartments.id = 'cloneListDepartments'
    
    Array.from(cloneListDepartments.children).forEach((department) => {
        const cloneId = `${department.id}-clone` 
        department.id = cloneId
    });

    return cloneListDepartments
}

function allDepartmentsExpander() {

    const cloneListDepartmentsElement = document.querySelector("#cloneListDepartments")
    if(cloneListDepartmentsElement) return

    const categoriesWrapper = document.createElement('div')
    classesAdd(categoriesWrapper, 'categoriesWrapper')
    // categoriesWrapper.id = `${department.id}-categories`


    const categoriesListWrapper = listCategories()
    categoriesWrapper.appendChild(categoriesListWrapper)

    return categoriesWrapper;
}

const allDepartmentsCategoriesExpander = () => {
    if (wait) return
    wait = true
    const cloneListDepartmentsElement = document.querySelector('#cloneListDepartments')
    if (cloneListDepartmentsElement) return
    if (!menuLinks.classList.contains('addEvent')) runReset()
    const categoriesWrapperElement = document.querySelector('.categoriesWrapper')
    if (departmentCategories.contains(categoriesWrapperElement)) categoriesWrapperElement.remove()

    setTimeout(() => wait = false, 51)

    removeDepartmentsFocus(listDepartments)

    const cloneListDepartments = cloneDepartments()

    const departmentsWrapper = allDepartmentsExpander()

    containerDepartments.classList.remove('hidden')
    
    setTimeout(
        () => classesAdd(containerDepartments, 'max-h-expanded border-2 mt-4'), 2
    )
    timeoutId = setTimeout(
        () => {
            departmentCategories.appendChild(cloneListDepartments)
            departmentCategories.appendChild(departmentsWrapper)
            classesAdd(cloneListDepartments.children[0], 'item-focus')
        }, 50
    )

    cloneListDepartments.childNodes.forEach((department) => {
        department.addEventListener('mouseenter', e => showCategories(e.target, true))
        department.addEventListener('click', e => showCategories(e.target, true))
    })

}

AllDepartmentsCategories.addEventListener('mouseenter', e => allDepartmentsCategoriesExpander(e.target))
AllDepartmentsCategories.addEventListener('click', e => allDepartmentsCategoriesExpander(e.target))

