const getDirection = (direction: string, fullDisplayName: boolean) => {
    const term = fullDisplayName ? 'bound' : ''
    switch (direction) {
        case ('N'):
            return `North${term}`
        case ('S'):
            return `South${term}`
        case ('E'):
            return `East${term}`
        case ('W'):
            return `West${term}`
        default:
            return `¯\_(ツ)_/¯`
    }
}

const filterContainsElement = (filterItems: string[], currentItem: string) => {

    return filterItems.some((filter: string) => filter === currentItem.toLowerCase())
}

const filterMatchesElement = (filterItem: string, currentItem: string) => {
    return filterItem === '' || currentItem.toLowerCase().includes(filterItem.toLowerCase())
}

const filterTrainArrivals = (samples: any, filterSelection: any) => {
    return samples.filter((sample: any) => filterContainsElement(filterSelection.lines, sample.LINE)
        && filterContainsElement(filterSelection.directions, getDirection(sample.DIRECTION, false))
        && filterMatchesElement(filterSelection.departure, sample.DESTINATION)
        && filterMatchesElement(filterSelection.arrival, sample.STATION))
}

export const parseTrainArrivals = (trainSchedules: any, filterSelection?: any) => {
    let filteredSelection = trainSchedules;

    if (!!filterSelection) {
        filteredSelection = filterTrainArrivals(filteredSelection, filterSelection)
    }

    return filteredSelection.map((trainSchedule: any) => { return { id: trainSchedule.TRAIN_ID, dest: trainSchedule.DESTINATION.toUpperCase(), dir: getDirection(trainSchedule.DIRECTION, true), line: trainSchedule.LINE, arrivalTime: trainSchedule.NEXT_ARR, arrivalStation: trainSchedule.STATION.toUpperCase(), waitTime: trainSchedule.WAITING_TIME } })
}


export const getGreeting = () => {
    const time = new Date().getHours()
    const greeting = 'Good '

    if (time < 12) {
        return `${greeting}morning!`
    } else if (time < 18) {
        return `${greeting}afternooon!`
    } else {
        return `${greeting}evening!`
    }
}