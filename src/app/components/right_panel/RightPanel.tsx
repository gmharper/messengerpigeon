
import { UserIcon, PencilSquareIcon } from "@heroicons/react/24/solid"

const icons = [
    { id: 'create_article', name: 'CREATE ARTICLE', component: <PencilSquareIcon className='flex text-white'/> },
    { id: '', name: '', component: <UserIcon className='flex text-white'/> },
    { id: '', name: '', component: <UserIcon className='flex text-white'/> },
]

function RightPanel ():React.JSX.Element {
    return (
        <div className='flex flex-col gap-4 ml-4'>
            <div className='h-16' />
            { icons.map((icon):React.JSX.Element => {
                return (
                    <button className='w-16 h-16 p-2 bg-zinc-700 rounded-sm outline-1 outline-gray-300 shadow-lg'>
                        { icon.component }
                    </button>
                )
            })}
        </div>
    )
}

export default RightPanel