import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {changeTodoListFilterAC, changeTodoListTitleAC, removeTodolistAC} from "../state/todolists-reducer";
import {Box, Button, ButtonGroup, Center, CloseButton, Flex} from "@chakra-ui/react";
import {StatusBadge} from "./status-badge";
import {TaskStatuses, TaskType} from "../api/todolists-api";


type TodoListPropsType = {
    id: string
    title: string
    activeStatus: TaskStatuses
}

export const TodoList: React.FC<TodoListPropsType> = React.memo(function ({id, title, activeStatus}) {

    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[id])
    const dispatch = useDispatch()

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, id))
    }, [dispatch, id])

    const changeTodoListTitleHandler = useCallback((newTodoListTitle: string) => {
        dispatch(changeTodoListTitleAC(newTodoListTitle, id))
    }, [dispatch, id])

    const changeStatus = useCallback(( activeStatus : TaskStatuses, todolistId: string) => {
        dispatch(changeTodoListFilterAC(activeStatus, id))
    }, [dispatch, id])



    let tasksForTodoList = tasks

    if (activeStatus === TaskStatuses.New) {
        tasksForTodoList = tasksForTodoList.filter(task => task.status === TaskStatuses.New)
    }
    if (activeStatus === TaskStatuses.Completed) {
        tasksForTodoList = tasksForTodoList.filter(task => task.status === TaskStatuses.Completed)
    }
    if (activeStatus === TaskStatuses.InProgress) {
        tasksForTodoList = tasksForTodoList.filter(task => task.status === TaskStatuses.InProgress)
    }
    if (activeStatus === TaskStatuses.Draft) {
        tasksForTodoList = tasksForTodoList.filter(task => task.status === TaskStatuses.Draft)
    }
    if (activeStatus === TaskStatuses.All) {
        tasksForTodoList = tasks
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
                        <Flex p={1} justifyContent={"space-between"} alignItems={"center"}>

                            <StatusBadge taskStatus={task.status} changeTaskStatus={changeTaskStatus}/>

                            <EditableSpan
                                onChangeTitle={onChangeTaskHandler}
                                title={task.title}/>
                            <CloseButton onClick={() => dispatch(removeTaskAC(task.id, id))}/>
                        </Flex>

                    )
                })}

                <Flex direction={"column"} alignItems={'center'}>
                    <ButtonGroup isAttached variant='outline' pt={1} pb={1}>
                        <Button
                            colorScheme={'blue'}
                            onClick={() => changeStatus(TaskStatuses.New, id)}
                        >New</Button>
                        <Button
                            colorScheme={'yellow'}
                            onClick={() => changeStatus(TaskStatuses.InProgress, id)}
                        >In progress</Button>
                        <Button
                            colorScheme={'teal'}
                            onClick={() => changeStatus(TaskStatuses.Completed, id)}
                        >Completed</Button>
                    </ButtonGroup>
                        <ButtonGroup isAttached variant='outline' pt={1} pb={1}>
                            <Button
                                colorScheme={'facebook'}
                                onClick={() => changeStatus(TaskStatuses.Draft, id)}
                            >Draft</Button>
                            <Button
                                colorScheme={'white'}
                                onClick={() => changeStatus(TaskStatuses.All, id)}
                            >All</Button>
                        </ButtonGroup>

                </Flex>
            </Box>
        </Box>
    )
})

