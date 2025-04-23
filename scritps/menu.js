// tailwindcss-language-server: enable

// listCategories.addEventListener('mouseenter', showMore)
// listCategories.addEventListener('click', showMore)  
// Preciso adicionar para os FILHOS
function classesAdd(element, stringClasses, separador = ' ') {
    const classes = stringClasses.split(separador).map(classe => classe.trim());
    element.classList.add(...classes);
  }


const showMore = (department) => {
    
    if (wait) return

    const categoriesWrapperElement = document.querySelector('.categoriesWrapper')
    if (categoriesWrapperElement) {
        if (categoriesWrapperElement.id.includes(department.id)) return
    }
    if (departmentCategories.contains(categoriesWrapperElement)) categoriesWrapperElement.remove()

    Array.from(listDepartments.children).forEach((department) => {
        const previousFocus = department.classList.contains('item-focus')
        if (previousFocus) department.classList.remove('item-focus');
    });

    classesAdd(department, 'item-focus')
    const titles = ['Categoria', 'Categoria', 'Categoria'];
    const items = () => Array(7).fill('Categoria');

    const categoriesWrapper = departmentCategoryExpander(department, titles, items)

    
    containerDepartments.classList.remove('hidden')
    setTimeout(
        () => {
            wait = false
            classesAdd(containerDepartments, 'max-h-expanded border-2 mt-4')
        }, 1
    )
    timeoutId = setTimeout(
        () => {
            departmentCategories.appendChild(categoriesWrapper)
            wait = false
        }
        , 150
    )


    const menuLinks = document.querySelector("#menu-links")
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
      
        setTimeout(() => {
          containerDepartments.classList.remove('max-h-expanded', 'border-2', 'mt-4');
          Array.from(listDepartments.children).forEach((department) => {
            const previousFocus = department.classList.contains('item-focus')
            if (previousFocus) department.classList.remove('item-focus');
        });
        }, 2)

        setTimeout(() => {
          containerDepartments.classList.add('hidden');
      
          const menuLinks = document.querySelector("#menu-links")
          menuLinks.classList.remove('addEvent');
          menuLinks.removeEventListener('mouseleave', reset);
          wait = false
      
        }, 600);
      }
      
    menuLinks.addEventListener('mouseleave', reset)
    
}


// const addChildrenCategories = (departmentElement) => {
const departmentCategoryExpander = (department, titles, items) => {
    
    const categoriesWrapper = document.createElement('div')
    classesAdd(categoriesWrapper, 'categoriesWrapper')
    categoriesWrapper.id = `${department.id}-categories`

    const departmentTitle = document.createElement('h2')
    // console.log(department.id)
    departmentTitle.textContent = department.textContent


    const categoriesListWrapper = document.createElement('div')
    categoriesListWrapper.id = `categoriesListWrapper`
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
    categoriesWrapper.appendChild(departmentTitle)
    categoriesWrapper.appendChild(categoriesListWrapper)

    return categoriesWrapper;
    
    // departmentElement.
}
let timeoutId = null
let wait = false;

const departmentCategories = document.querySelector("#department_categories")
const AllDepartmentsCategories = document.querySelector('#all_departments_categories')
const listDepartments = document.querySelector('#list_departments')
const containerDepartments = document.querySelector("#container-departments")

// departmentsCategories.addEventListener('mouseenter', showMore)
// departmentsCategories.addEventListener('click', showMore)

listDepartments.childNodes.forEach((department) => {
    department.addEventListener('mouseenter', e => showMore(e.target))
    department.addEventListener('click', e => showMore(e.target))
})

