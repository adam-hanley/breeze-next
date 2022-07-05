import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import useSWR from 'swr'
import Image from 'next/image'
// import Leads from '@/components/dashboard/leads'
import { LeadCard } from '@/components/lead/lead-card'
const fetcher = url => axios.get(url).then(res => res.data)

function LeadList () {
    const { data: leads, error } = useSWR('/api/leads', fetcher)
    if (error) return <p>Failed to load leads</p>
    if (!leads) return <p>Loading...</p>
    return leads.map(lead => <LeadCard key={lead.id} lead={lead} />)
}
 
function User () {
    const { user }= useAuth({ middleware: 'auth' })
    if (!user) return <p>Loading...</p>
    return <p>{user.name}</p>
}
const Dashboard = () => {
    const { user } = useAuth({ middleware: 'auth' })
    if (user.seller) {
        return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                 {user.name} - {user.seller.name} - Dashboard
                </h2>
                }
            >

            <Head>
                <title>Laravel - Dashboard</title>
            </Head>
            <div className="p-6 bg-white border-b border-gray-200">
                <h1 className="text-2xl font-semibold text-gray-800">Your Leads</h1>
                {LeadList()}
            </div>
            {/* <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            You're logged in!
                            Welcome {user?.name}!
                        </div>
                    </div>
                </div>
            </div> */}
        </AppLayout>
    )
        }
        return (
            <AppLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        {user.name} - Must Be A Seller
                    </h2> 
                }
            >

                    <Head>
                        <title>Laravel - Dashboard</title>
                    </Head>
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h1 className="text-2xl font-semibold text-gray-800">Your Leads</h1>
                        {LeadList()}
                    </div>
                    </AppLayout>
        )

                        
}

export default Dashboard
