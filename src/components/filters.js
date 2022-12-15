import React, { useEffect } from "react";
import { 
    Stack,
    Box, 
    Select, 
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Icon,
} from '@chakra-ui/react'
import { FaList, FaTable, FaCalendar } from 'react-icons/fa'

import languages from '../data/languages'

export function Filters(props) {
    const { 
        onViewChange,
        viewType,
        onDateJumpChange,
        dateJump,
        language,
        onLanguageChange, 
    } = props

    useEffect(() => {
        onViewChange( viewType )
    }, [viewType]);

    return (
        <Stack isInline>
            <Select bg='white' value={language} onChange={(e) => onLanguageChange(e.target.value)}>
                {languages.map(language => (
                    <option key={language.value} value={language.value}>
                        {language.label}
                    </option>
                ))}
            </Select>

            <Menu>
                <MenuButton
                    textAlign='left'
                    w='250px'
                    justifyContent='flex-start'
                    _focus={{boxShadow: 'none'}} 
                    as={Button} 
                    bg='white' 
                    borderWidth={1} 
                    px='15px' 
                    fontWeight={400} 
                >
                    <Icon as={FaCalendar} mr={3} />
                    <Box as='span' textTransform='capitalize'>
                        {dateJump}
                    </Box>
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => onDateJumpChange('day')}>Daily</MenuItem>
                    <MenuItem onClick={() => onDateJumpChange('week')}>Weekly</MenuItem>
                    <MenuItem onClick={() => onDateJumpChange('month')}>Monthly</MenuItem>
                    <MenuItem onClick={() => onDateJumpChange('year')}>Yearly</MenuItem>
                </MenuList>
            </Menu>

            <Stack 
                isInline 
                spacing={0} 
                borderWidth={1} 
                rounded='5px' 
                alignItems='center' 
                ml='10px'>
                <Button 
                    onClick={() => onViewChange('grid')}
                    leftIcon={<FaTable />} 
                    h='100%' 
                    fontWeight={400} 
                    bg= {viewType === 'grid' ? 'gray.200' : 'white'}
                    >
                    Grid
                </Button>
                <Button 
                    onClick={() => onViewChange('list')}
                    roundedLeft={0} 
                    h='100%' 
                    roundedRight={0} 
                    fontWeight={400} 
                    leftIcon={<FaList />} 
                    bg={viewType === 'list' ? 'gray.200' : 'white'}
                >
                    List
                </Button>
            </Stack>
        </Stack>
    )
}