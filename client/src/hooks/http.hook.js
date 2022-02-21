import { useState, useCallback } from 'react'
import $api from '../http'


export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [status, setStatus] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {

            let data

            if (method == 'POST') {
                await $api.post(url, body).then((res) => {
                    data = res.data
                    setStatus(200)
                }, (error) => {
                    setStatus(400)
                    console.log(error);
                    throw new Error(data.message || 'Что-то пошло не так')
                })
            } else if (method == 'GET') {
                await $api.get(url).then((res) => {
                    data = res.data
                    setStatus(200)
                }, (error) => {
                    setStatus(400)
                    console.log(error);
                    throw new Error(data.message || 'Что-то пошло не так')
                })
            }

            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return { loading, status, request, error, clearError }
}