import {Todo, TodoTemplate} from "../models/todo";
import * as dateMath from "date-arithmetic";
import axios from "axios";

export class TemplateHelper {

  private token: string;

  private todoservice: string;

  constructor(todoservice: string, token: string) {
    this.token = token;
    this.todoservice = todoservice;
  }

  public async TemplatesToToDos(data: TodoTemplate[]): Promise<Todo[]> {
    const todos: Todo[] = [];
    for (let i = 0; i < data.length; i++) {
      todos.push(await this.TemplateToToDo(data[i]));
    }
    return todos;
  }

  public async getChild(template: TodoTemplate): Promise<Todo> {
    return axios.get<TodoTemplate[]>(this.todoservice + '?template=true', {
      headers: {'authorization': this.token},
      data: {_id: template._id}
    }).then(value => {
      return value.data[0].children[0];
    }).catch((e) => undefined);
  }

  public async TemplateToToDo(template: TodoTemplate, startDate?: Date): Promise<Todo> {
    if (!startDate) {
      startDate = (await this.getChild(template).then(value => value.startDate).catch(err => undefined) || new Date())
    }
    let templateTMP: TodoTemplate = Object.assign({}, template);
    template.children = undefined;
    let period = template.templatePeriod;
    template.templatePeriod = undefined;
    template.isTemplate = false;
    let todo: Todo = templateTMP;
    todo._id = undefined;
    todo.parent = {_id: template._id};
    todo.startDate = startDate;
    todo.latestFinish = dateMath.add(todo.startDate, period, 'day');
    return todo;
  }

  public async TemplatesToToDosByDates(data: TodoTemplate[], startDate: Date, endDate: Date): Promise<Todo[]> {
    let duration = parseInt(((endDate.valueOf() - startDate.valueOf()) / (1000 * 60 * 60 * 24)).toFixed(0));

    console.log(dateMath.day(startDate));
    console.log("Duration: %s  - %s = %s", endDate.toString(), startDate.toString(), duration.toString());

    const todos: Todo[] = [];
    for (let i = 0; i < data.length; i++) {
      const template = data[i];
      let repeat = duration / template.templatePeriod + ((duration % template.templatePeriod === 0) ? 0 : 1);
      let period = template.templatePeriod;
      console.log("repeat: %s", repeat);
      for (let i = 0; i < repeat; i++) {
        let todo = await this.TemplateToToDo(template, dateMath.add(startDate, period * i, 'day'));
        todos.push(todo);
      }
    }
    return todos;
  }
}
