import React, { useState, useEffect, FormEvent } from 'react'
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_PAGE_DETAILS } from '../queries/WebService';
import { PageDetails } from '../interfaces/PageDetails';

const Main: React.FunctionComponent<{

}> = () => {
    const [pageDetails, setPageDetails] = useState<PageDetails | null>(null)
    const [url, setUrl] = useState<string>('')

    const [getPageDetails, { data, loading, error }] = useLazyQuery<{ getPageDetails: PageDetails }, { url: string }>(GET_PAGE_DETAILS)

    useEffect(() => {
        if (data) {
            setPageDetails(data.getPageDetails)
        }
    }, [data])

    const onSubmit = (event: FormEvent) => {
        event.preventDefault()

        getPageDetails({
            variables: {
                url
            }
        })
    }

    return (
        <section className="container p-8">
            <h1 className="text-center text-4xl font-bold">
                Web Page Analyzer
            </h1>

            <form onSubmit={onSubmit} className="panel">
                <div className="mb-4">
                    <label className="label" htmlFor="url">
                        Enter the URL:
                    </label>
                    <input onChange={(event) => setUrl(event.target.value)} className="input" type="text" placeholder="http://mysite.com" />
                </div>
                <button disabled={loading} type="submit" className="button w-full">
                    Get awesome details
                    {
                        loading ? (
                            <>&nbsp;&nbsp;&nbsp;<i className="fa fa-spinner fa-spin"></i></>
                        ) : null
                    }
                </button>
            </form>

            {
                !loading && error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error. </strong>
                        <span className="block sm:inline">{error.message}</span>
                    </div>
                ) : null
            }

            {
                pageDetails ? (
                    <div className="panel">
                        <div className="flex flex-horizontal border-b border-gray-300 justify-between p-4">
                            <p className="font-bold">Page Title</p>
                            <p>{pageDetails.title}</p>
                        </div>
                        <div className="flex flex-horizontal border-b border-gray-300 justify-between p-4">
                            <p className="font-bold">HTML Version</p>
                            <p>{pageDetails.htmlVersion}</p>
                        </div>
                        <div className="flex flex-horizontal border-b border-gray-300 justify-between p-4">
                            <p className="font-bold">Internal Links</p>
                            <p>{pageDetails.internalLinks}</p>
                        </div>
                        <div className="flex flex-horizontal justify-between p-4">
                            <p className="font-bold">External Links</p>
                            <p>{pageDetails.externalLinks}</p>
                        </div>
                    </div>
                ) : null
            }

            {
                pageDetails && pageDetails.links.length > 0 ? (
                    <div className="panel">
                        <table className="rounded-t-lg max-w-full min-w-full">
                            <caption className="font-bold text-xl mb-6">Links</caption>
                            <thead className="border border-gray-300 rounded-t-lg shadow-lg">
                                <tr className="rounded-t-lg ">
                                    <th className="px-8 py-3 font-bold text-lg">#</th>
                                    <th className="px-8 py-3 font-bold text-lg">Link</th>
                                    <th className="px-8 py-3 font-bold text-lg">Text</th>
                                    <th className="px-8 py-3 font-bold text-lg">Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    pageDetails.links.map((link, i) => (
                                        <tr key={i} className="border border-b-1 border-gray-300 bg-gray-100">
                                            <td className="text-center px-1 py-2">{i + 1}</td>
                                            <td className="text-center px-1 py-2">{link.url}</td>
                                            <td className="text-center px-1 py-2" dangerouslySetInnerHTML={{ __html: link.text }} />
                                            <td className="text-center px-1 py-2">{link.internal ? "Internal" : "External"}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                ) : null
            }
        </section>
    )
}

export default Main