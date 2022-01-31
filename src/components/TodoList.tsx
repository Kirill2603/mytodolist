import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {
    addTaskTC, changeTaskStatusTC,
    changeTaskTitleAC,
    fetchTasksTC,
    removeTaskTC
} from "../state/tasks-reducer";
import {
    changeTodoListActiveStatusAC,
    changeTodoListTitleTC,
    removeTodoListTC
} from "../state/todolists-reducer";
import {Box, Button, ButtonGroup, Center, CircularProgress, CloseButton, Divider, Flex} from "@chakra-ui/react";
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

    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [dispatch, id])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(id, title))
    }, [dispatch, id])

    const changeTodoListTitleHandler = useCallback((newTodoListTitle: string) => {
        dispatch(changeTodoListTitleTC(id, newTodoListTitle))
    }, [dispatch, id])

    const changeStatus = useCallback((activeStatus: TaskStatuses, id: string) => {
        dispatch(changeTodoListActiveStatusAC(activeStatus, id))
    }, [dispatch])


    const taskStatus = useSelector<AppRootState, 'idle' | 'loading' | 'succeeded' | 'failed'>((state) =>
        state.app.TodoListsStatus)

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

        <Box maxW='xs' borderWidth='1px' borderRadius='lg' overflow='hidden'>

            <Center>
                <EditableSpan title={title} onChangeTitle={changeTodoListTitleHandler}/>
                <CloseButton onClick={() => dispatch(removeTodoListTC(id))}/>
            </Center>

            <Box maxW='md' borderWidth='1px' borderRadius='lg' overflow='hidden' p={3}>
                <AddItemForm addItem={addTask}/>

                {tasksForTodoList.map((task) => {

                    const onChangeTaskHandler = (newTaskTitle: string) => {
                        dispatch(changeTaskTitleAC(newTaskTitle, task.id, id))
                    }
                    const changeTaskStatus = (status: TaskStatuses) => {
                        dispatch((changeTaskStatusTC(id, task.id, status)))
                    }

                    return (<div key={task.id}>

                            <Flex p={1} justifyContent={"space-between"} alignItems={"center"} key={task.id}>

                                <StatusBadge taskStatus={task.status} changeTaskStatus={changeTaskStatus}/>

                                <EditableSpan
                                    onChangeTitle={onChangeTaskHandler}
                                    title={task.title}/>
                                <CloseButton onClick={() => dispatch(removeTaskTC(id, task.id))}/>
                            </Flex>
                            <Divider/>
                        </div>
                    )
                })}


                {
                    taskStatus === "loading"
                    &&
                    <Center p={5}>
                        <CircularProgress size={100} isIndeterminate color='green.300'/>
                    </Center>
                }


                <Flex direction={"column"} alignItems={'center'} pt={3}>
                    <ButtonGroup isAttached variant='outline' pt={1} pb={1} size={"xs"}>
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

