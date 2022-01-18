import React, {useState} from "react";
import {
    Badge,
    Popover,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger, Radio, RadioGroup, Stack
} from "@chakra-ui/react";
import {TaskStatuses} from "../api/todolists-api";

type StatusBadgePropsType = {
    taskStatus: number
    changeTaskStatus: (status: number) => void
}

export const StatusBadge: React.FC<StatusBadgePropsType> = ({taskStatus, changeTaskStatus}) => {


    const [selectedStatus , setSelectedStatus] = useState(taskStatus)

    let color, title
    switch (taskStatus) {
        case 0:
            color = 'blue'
            title = 'new'
            break
        case 1:
            color = 'yellow'
            title = 'In progress'
            break
        case 2:
            color = 'green'
            title = 'Completed'
            break
        case 3:
            color = 'white'
            title = 'Draft'
            break
        default:
            color = 'white'
            title = 'wtf'
    }

    return (
        <>
            <Popover placement='right' matchWidth={true} size={'xs'} >
                <PopoverTrigger>
                    <Badge colorScheme={color} cursor={"pointer"}>{title}</Badge>
                </PopoverTrigger>
                <PopoverContent width={'160px'}>
                    <PopoverHeader fontWeight='semibold'>Change status</PopoverHeader>
                    <PopoverCloseButton/>
                    <PopoverBody>
                        <RadioGroup defaultValue={selectedStatus} value={selectedStatus}>
                            <Stack>

                                <div onClick={() => {changeTaskStatus(TaskStatuses.New)}} onChange={() => setSelectedStatus(0)}>
                                    <Radio value={0} >New</Radio>
                                </div>

                                <div onClick={() => {changeTaskStatus(TaskStatuses.InProgress)}}  onChange={() => setSelectedStatus(1)}>
                                    <Radio colorScheme='orange' value={1}>In progress</Radio>
                                </div>

                                <div onClick={() => {changeTaskStatus(TaskStatuses.Completed)}}  onChange={() => setSelectedStatus(2)}>
                                    <Radio colorScheme='green' value={2}>Completed</Radio>
                                </div>

                                <div  onClick={() => {changeTaskStatus(TaskStatuses.Draft)}}  onChange={() => setSelectedStatus(3)}>
                                    <Radio colorScheme='facebook' value={3}>Draft</Radio>
                                </div>

                            </Stack>
                        </RadioGroup>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    )
}