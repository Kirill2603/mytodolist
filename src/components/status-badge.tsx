import React from "react";
import {
    Badge,
    Popover,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger, Radio, RadioGroup, Stack
} from "@chakra-ui/react";

type StatusBadgePropsType = {
    taskStatus: number
    changeTaskStatus: (status: number) => void
}

export const StatusBadge: React.FC<StatusBadgePropsType> = ({taskStatus,changeTaskStatus}) => {

    let color, title
    switch (taskStatus) {
        case 0: color = 'blue'
            title = 'new'
            break
        case 1: color = 'yellow'
            title = 'In progress'
            break
        case 2: color = 'green'
            title = 'Completed'
            break
        case 3: color = 'white'
            title = 'Draft'
            break
        default: color = 'white'
            title = 'wtf'
    }

    return (
        <>
            <Popover placement='right' matchWidth={true} size={'xs'}>
                <PopoverTrigger>
                    <Badge colorScheme={color} cursor={"pointer"}>{title}</Badge>
                </PopoverTrigger>
                <PopoverContent width={'160px'}>
                    <PopoverHeader fontWeight='semibold'>Change status</PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                        <RadioGroup defaultValue={taskStatus}>
                            <Stack>
                            <Radio value={0} onClick={()=>{changeTaskStatus(0)}}>New</Radio>
                            <Radio value={1} onClick={()=>{changeTaskStatus(1)}}>In progress</Radio>
                            <Radio value={2} onClick={()=>{changeTaskStatus(2)}}>Completed</Radio>
                            <Radio value={3} onClick={()=>{changeTaskStatus(3)}}>Draft</Radio>
                            </Stack>
                        </RadioGroup>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    )
}