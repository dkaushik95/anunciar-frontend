import { computed, observable } from 'mobx'

class TodoStore {
    @observable todos = ["buy milk", "buy eggs"]
    @observable filter = ""
    @computed get filteredTodos(){
        var matchesFilter = new RegExp(this.filter, "i")
        return this.todos.filter(todo => !this.filter || matchesFilter.test(todo))
    }
    createTodo(value){
        this.todos.push(value)
    }
}

var store = window.store = new TodoStore

export default store