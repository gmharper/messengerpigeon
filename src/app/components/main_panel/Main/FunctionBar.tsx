
// IMPORTS
import { Dispatch, SetStateAction } from "react"
import Select from 'react-select';

// COMPONENTS
import { SearchBar } from "./index"

import { 
    ChevronDownIcon, 
    ChevronUpIcon, 
    QueueListIcon, 
    Squares2X2Icon 
} from "@heroicons/react/24/outline"


// TYPE DECLARATIONS
type Props = {
    displayType: string,
    sortType: string,
    showRoost: boolean,
    setShowRoost: Dispatch<SetStateAction<boolean>>,
    setCardShape: Dispatch<SetStateAction<string>>,
    setSearchInput: Dispatch<SetStateAction<string>>,
    setActiveSort: Dispatch<SetStateAction<string>>,
    setActiveOrder: Dispatch<SetStateAction<string>>,
    setActivePage: Dispatch<SetStateAction<number>>
}

type sortTypeObj = { id:string, name: string}
type sortTypes = {
    'feed': Array<sortTypeObj>
    'users': Array<sortTypeObj>
    'topics': Array<sortTypeObj>
    'articles': Array<sortTypeObj>
    'comments': Array<sortTypeObj>
}

type filters = {
    'read': boolean,
    'liked': boolean
}    

// VARIABLES
const sortTypes:any = {
    'feed': [
        { id: 'likes', name: 'LIKES' },
        { id: 'created_at', name: 'DATE CREATED' }
    ],    
    'users': [
        { id: 'followers', name: 'FOLLOWERS' },
        { id: 'likes', name: 'LIKES' }, 
        { id: 'created_at', name: 'DATE CREATED' }
    ],
    'topics': [
        { id: 'followers', name: 'FOLLOWERS' },
        { id: 'created_at', name: 'DATE CREATED'}
    ],
    'articles': [
        { id: 'likes', name: 'LIKES' },
        { id: 'favourites', name: 'FAVOURITES' },
        { id: 'created_at', name: 'DATE CREATED' }
    ],
    'comments': [
        { id: 'likes', name: 'LIKES'},
        { id: 'created_at', name: 'DATE POSTED' },
    ]
}

const myFilters:filters = {
    'read': false,
    'liked': false
}

function FunctionBar({ displayType, sortType, showRoost, setShowRoost, setCardShape, setSearchInput, setActiveSort, setActiveOrder, setActivePage }:Props ):React.JSX.Element {
    return (
        <div className='flex flex-row gap-2 m-h-7 h-7 px-2'>
            <SearchBar setSearchInput={setSearchInput} styling={''} />

            <div className='flex-1' />

            <button 
                className='flex w-24 h-6 bg-white rounded-b-xl justify-center items-center -mt-3'
                onClick={() => {setShowRoost(!showRoost)}}>
                    { showRoost ? <ChevronUpIcon className='text-black h-8'/> : <ChevronDownIcon className='text-black h-8'/>}
            </button>

            <div className='flex-1' />

            <button
                className='bg-white rounded-md p-1 hover:outline-1 outline-violet-500'
                onClick={() => {setCardShape('row')}}
            >
                <QueueListIcon className='w-full h-full text-black'/>
            </button>
            
            <button 
                className='bg-white rounded-md border-3 border-double hover:outline-1 outline-violet-500'
                onClick={() => {setCardShape('square')}}
            >
                <Squares2X2Icon className='w-full h-full text-black'/>
            </button>

            <select 
                className='w-40 h-full text-black bg-white content-center items-center text-center rounded-sm'
                defaultValue={'created_at'} 
                onChange={(e) => { setActiveSort(e.target.value) }}>
            { sortTypes[sortType].map((sortType:sortTypeObj) => {
                return <option key={sortType.id} value={sortType.id}>{sortType.name}</option>
            }) }
            </select>

            <select
                className='w-20 h-full text-black bg-white content-center items-center text-center rounded-sm'
                defaultValue={'DESC'}
                onChange={(e) => { setActiveOrder(e.target.value) }}>
                
                <option>DESC</option>
                <option>ASC</option>
            </select>

            {/* { 
                (displayType==='feed') ?
                    <Select 
                        className='w-40 h-full pb-1 bg-white'
                        options={[{ value: 'liked', label: 'Liked'}]} 
                        isMulti={true}
                    /> :
                
                (displayType==='users' || displayType==='user_page') ?
                    <Select
                        classNames={{
                                container: (state) => 'w-60 h-9 max-h-9',
                                valueContainer: (state) => 'bg-white text-sm'
                            }}
                        options={[{ value: 'followed', label: 'Followed'}]} 
                        isMulti={true}
                    /> :

                (displayType==='topics' || displayType==='topic_page') ?
                    <Select 
                        className='w-40 h-full pb-1 bg-white' 
                        options={[{ value: 'subscribed', label: 'Subscribed'}]} 
                        isMulti={true}
                    /> :

                ( displayType==='articles' || displayType==='article_page') ?
                    <Select 
                        className='w-40 h-full pb-1 bg-white' 
                        options={[{ value: 'Liked', label: 'liked'}, { value:'read', label: 'Read'}]} 
                        isMulti={true}
                    /> :

                ( displayType==='comments' || displayType==='comment_page') ?
                    <Select 
                        className='w-40 h-full pb-1 bg-white' 
                        options={[{ value: 'Liked', label: 'liked'}]} 
                        isMulti={true}
                    /> :

                <></>
            } */}
        </div>
    )
}

export default FunctionBar