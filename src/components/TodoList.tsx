import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {FilterValuesType} from "../App-withRedux";
import {changeTodoListFilterAC, changeTodoListTitleAC, removeTodolistAC} from "../state/todolists-reducer";
import {Box, Button, ButtonGroup, Center, Checkbox, CloseButton} from "@chakra-ui/react";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const TodoList: React.FC<TodoListPropsType> = React.memo(function ({id, title, filter}) {

    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[id])
    const dispatch = useDispatch()

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, id))
    }, [dispatch, id])

    const changeTodoListTitleHandler = useCallback((newTodoListTitle: string) => {
        dispatch(changeTodoListTitleAC(newTodoListTitle, id))
    }, [dispatch, id])

    const changeFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodoListFilterAC(filter, todolistId))
    }, [dispatch])

    let tasksForTodoList = tasks

    if (filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(task => task.isDone)
    }
    if (filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(task => !task.isDone)
    }
    if (filter === 'all') {
        tasksForTodoList = tasksForTodoList.filter(task => task)
    }
    console.log('todoList rendered')

    return (

        <Box maxW='xs' borderWidth='1px' borderRadius='lg' overflow='hidden' bgColor={'teal.800'}>

            <Center><EditableSpan title={title} onChangeTitle={changeTodoListTitleHandler}/>
                <CloseButton onClick={() => dispatch(removeTodolistAC(id))}/>
            </Center>

            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' p={3} bgColor={'#1a202c'}>
                <AddItemForm addItem={addTask} />

                {tasksForTodoList.map((task) => {

                    const onChangeTaskHandler = (newTaskTitle: string) => {
                        dispatch(changeTaskTitleAC(newTaskTitle, task.id, id))
                    }

                    return (
                        <Center pt={2}>
                            <Checkbox
                                isChecked={task.isDone}
                                type={"checkbox"}
                                onChange={(e) => dispatch(
                                    changeTaskStatusAC(task.id, e.currentTarget.checked, id))}/>
                            <EditableSpan
                                onChangeTitle={onChangeTaskHandler}
                                title={task.title}/>
                            <CloseButton onClick={() => dispatch(removeTaskAC(task.id, id))}/>
                        </Center>

                    )
                })}

                <Center>
                    <ButtonGroup isAttached variant='outline' pt={5} pb={5}>
                        <Button
                            colorScheme={'blue'}
                            onClick={() => changeFilter('all', id)}>All</Button>
                        <Button
                            colorScheme={'yellow'}
                            onClick={() => changeFilter('active', id)}>Active</Button>
                        <Button
                            colorScheme={'teal'}
                            onClick={() => changeFilter('completed', id)}>Completed</Button>
                    </ButtonGroup>
                </Center>
            </Box>
        </Box>
    )
})

