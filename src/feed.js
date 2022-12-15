import React, { useEffect, useState } from "react";
import { Box, Flex, SimpleGrid, Button } from "@chakra-ui/react"
import { PageHeader } from "./components/page-header";
import { GroupTitle } from "./components/group-title";
import { Filters } from "./components/filters"
import { Repo } from "./components/repo"
import moment from "moment/moment";
import useFetch from "use-http";
import { PageLoader } from "./components/page-loader";

function transformFilters({language, startDate, endDate}){
    const transformFilters = {}

    const  languageQuery = language ? `language:${language}` : ''
    const dateQuery = `created:${startDate}..${endDate}`

    transformFilters.q = languageQuery + dateQuery
    transformFilters.sort = "stars"
    transformFilters.order = "desc"

    return transformFilters
}

export function Feed() {
    const { loading, error, get, } = useFetch('https://api.github.com')

    const [ viewType, setViewType ] = useState('grid')
    const [ dateJump, setDateJump ] = useState('day')
    const [ language, setLanguage ] = useState()

    const [ repositories, setRepositories ] = useState([])

    const [ startDate, setStartDate ] = useState()
    const [ endDate, setEndDate ] = useState(moment().subtract(1,"day").format())

    useEffect(() => {
        const endDate = moment().subtract(1, "day").format()
        const startDate = moment(endDate).subtract(1, dateJump).format()

        setEndDate(endDate)
        setStartDate(startDate)

        setRepositories([])
    }, [dateJump, language])

    useEffect(() => {
        if(!startDate) {
            return
        }

        const filters = transformFilters({language, startDate, endDate})
        const filtersQuery = new URLSearchParams(filters).toString()

        get(`/search/repositories?${filtersQuery}`).then((res) => {
            setRepositories([
                ...repositories,
                {
                    startDate,
                    endDate,
                    items: res.items,
                }
            ])
        })
    }, [startDate])

    return (
        <Box maxWidth="1200px" mx="auto">
            <PageHeader />
            {repositories.length === 0 && loading && <PageLoader />}

            <Flex alignItems='center' justifyContent='space-between' mb='25px'>
                <GroupTitle 
                    startDate={repositories?.[0]?.startDate} 
                    endDate={repositories?.[0]?.endDate} 
                />
                <Filters 
                    viewType={viewType}
                    onViewChange={setViewType}
                    dateJump={dateJump}
                    onDateJumpChange={setDateJump}
                    language={language}
                    onLanguageChange={setLanguage}
                />
            </Flex>

            {repositories.map((repoGroup, counter) => {
                const groupTitle = counter > 0 && (
                    <Flex alignItems="center" justifyContent="center" mt="25px" mb="15px">
                        <GroupTitle 
                            startDate={repoGroup.startDate} 
                            endDate={repoGroup.endDate} 
                        />
                    </Flex>
                )
                return (
                    <Box>
                        {groupTitle}
                        <SimpleGrid 
                            columns={viewType === 'list' ? 1 : [1, 1, 2, 3, 3]} 
                            spacing='15px' 
                            mt='20px'
                        >
                            {repoGroup.items.map((repo) => (
                                <Repo isListView={viewType === "list"} repo={repo} />
                            ))}
                        </SimpleGrid>
                    </Box>
                )
            })}

            <Flex alignItems='center' justifyContent='center' my='20px'>
                <Button isLoading={loading} onClick={() => {
                    setEndDate(startDate)
                    setStartDate(moment(startDate).subtract(1, dateJump).format())
                }} colorScheme='blue'>Load next group</Button>
            </Flex>
        </Box>
    )
}