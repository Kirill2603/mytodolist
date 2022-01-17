import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {FilterValuesType} from "../App-withRedux";
import {changeTodoListFilterAC, changeTodoListTitleAC, removeTodolistAC} from "../state/todolists-reducer";
import {Box, Button, ButtonGroup, Center, CloseButton, Flex} from "@chakra-ui/react";
import {StatusBadge} from "./status-badge";

type TaskType = {
    id: string
    title: string
    status: number
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
        tasksForTodoList = tasksForTodoList.filter(task => task.status)
    }
    if (filter === 'new') {
        tasksForTodoList = tasksForTodoList.filter(task => !task.status)
    }
    if (filter === 'all') {
        tasksForTodoList = tasksForTodoList.filter(task => task)
    }

    return (

        <Box maxW='md' borderWidth='1px' borderRadius='lg' overflow='hidden' bgColor={'teal.800'} >

            <Center><EditableSpan title={title} onChangeTitle={changeTodoListTitleHandler}/>
                <CloseButton onClick={() => dispatch(removeTodolistAC(id))}/>
            </Center>

            <Box maxW='md' borderWidth='1px' borderRadius='lg' overflow='hidden' p={3} bgColor={'#1a202c'}>
                <AddItemForm addItem={addTask} />

                {tasksForTodoList.map((task) => {

                    const onChangeTaskHandler = (newTaskTitle: string) => {
                        dispatch(changeTaskTitleAC(newTaskTitle, task.id, id))
                    }
                    const changeTaskStatus =(status: number) => {
                        dispatch((changeTaskStatusAC(task.id, status, id)))
                    }

                    return (
                        <Flex p={1} justifyContent={"space-around"} alignItems={"center"}>

                            <StatusBadge taskStatus={task.status} changeTaskStatus={changeTaskStatus}/>

                            {/*<Checkbox*/}
                            {/*    isChecked={task.isDone}*/}
                            {/*    type={"checkbox"}*/}
                            {/*    onChange={(e) => dispatch(*/}
                            {/*        changeTaskStatusAC(task.id, e.currentTarget.checked, id))}/>*/}
                            <EditableSpan
                                onChangeTitle={onChangeTaskHandler}
                                title={task.title}/>
                            <CloseButton onClick={() => dispatch(removeTaskAC(task.id, id))}/>
                        </Flex>

                    )
                })}

                <Center>
                    <ButtonGroup isAttached variant='outline' pt={5} pb={5} size={'md'}>
                        <Button
                            colorScheme={'blue'}
                            onClick={() => changeFilter('new', id)}>New</Button>
                        <Button
                            colorScheme={'yellow'}
                            onClick={() => changeFilter('in progress', id)}>In progress</Button>
                        <Button
                            colorScheme={'teal'}
                            onClick={() => changeFilter('completed', id)}>Completed</Button>
                        <Button
                            colorScheme={'facebook'}
                            onClick={() => changeFilter('draft', id)}>Draft</Button>
                        <Button
                            colorScheme={'facebook'}
                            onClick={() => changeFilter('all', id)}>All</Button>
                    </ButtonGroup>
                </Center>
            </Box>
        </Box>
    )
})

