/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react'
import { useState } from 'react'

export const useQueries = ({prefixUrl = ''} = {}) => {
    const [data, setData] = useState({
        data: null,
        isLoading: true,
        isError: null
    })

    const fetchingData = useCallback(async ({url = '', method = 'GET'} = {}) => {
        setData({
            ...data,
            isLoading: true,
        })

        try {
            const response = await fetch(url, { method } )
            const result = await response.json()

            setData({
                ...data,
                data: result,
                isLoading: false,
            })
        } catch (error) {
            setData({
                ...data,
                isLoading: false,
                isError: error
            })
        }
    }, [])

    useEffect(() => {
        if(prefixUrl){
            fetchingData({url: `${prefixUrl}`})
        }
    },[])

    return {...data};
}