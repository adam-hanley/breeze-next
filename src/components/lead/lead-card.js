import * as React from 'react';

const getTimeSince = (time) => {
    const now = new Date();
    const then = new Date(time);
    const diff = now.getTime() - then.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor(diff / 1000);
    const timeSince = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    return timeSince;
}

export const LeadCard = ({ lead }) => {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpand = () => {
        setExpanded(!expanded)
        console.log(expanded)
    };
    const timeSince = getTimeSince(lead.created_at);
    return (
        <div className="flex flex-col items-center justify-center w-1/4 max-w-sm h-full bg-gray-900 p-2 m-10 rounded-3xl">
            <div onMouseEnter={handleExpand} onMouseLeave={handleExpand}>
                <div>
                    <h2 className='text-xl text-yellow-300 p-3 align-middle'>{lead.buyer.name}</h2>
                    <h3 className='text-yellow-300 p-1'>{lead.buyer.email}</h3>
                    <h3 className='text-yellow-300 p-1'>{lead.buyer.phone}</h3>
                   
                    <h3 className='text-yellow-300 p-1'>{getTimeSince(lead.created_at)}</h3>

                </div>
                <div>
                    {expanded && <div className="flex flex-col items-center justify-center w-1/4 max-w-sm h-full bg-gray-900">
                        <div>
                            <h3 className='text-yellow-300 p-1'>{lead.buyer.address}</h3>
                            <h3 className='text-yellow-300 p-1'>{lead.buyer.city}</h3>
                            <h3 className='text-yellow-300 p-1'>{lead.buyer.state}</h3>
                            <h3 className='text-yellow-300 p-1'>{lead.buyer.zip}</h3>
                            <h3 className='text-yellow-300 p-1'>{lead.buyer.country}</h3>
                        </div>    
                    </div>}
                </div>
            </div>
        </div>
    );
}