import {Todo, TodoTemplate} from "../models/todo";

export class TemplateHelper {

  static TemplatesToToDos(data: TodoTemplate[]): Todo[] {
    return data.map(this.TemplateToToDo);
  }

  static TemplateToToDo(template: TodoTemplate): Todo {
    template.children = undefined;
    template.templatePeriod = undefined;
    template.isTemplate = false;
    let todo: Todo = Object.assign({}, template);
    todo._id = undefined;
    todo.parent = {_id: template._id};
    return todo;
  }

  static TemplatesToToDosByDates(data: TodoTemplate[], startDate: Date, endDate: Date): Todo[] {
    let duration = parseInt(((endDate.valueOf() - startDate.valueOf()) / (1000 * 60 * 60 * 24)).toFixed(0));
    console.log("Duration: %s  - %s = %s", endDate.toString(), startDate.toString(), duration.toString());
    return data.flatMap((template, index, data) => {
      let repeat = duration / template.templatePeriod + ((duration % template.templatePeriod === 0) ? 0 : 1);
      let todos: Todo[] = [];
      console.log("repeat: %s", repeat);
      for (let i = 0; i < repeat; i++) {
        let todo = this.TemplateToToDo(template);
        //TODO set StartDate & LastFinish
        todos.push(todo);
      }
      return todos;
    })
  }
}
