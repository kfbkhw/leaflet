'use client';

import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

import { useEditor, EditorContent, BubbleMenu, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';
import { Typography as TiptapTypography } from '@tiptap/extension-typography';

export const WritePost = () => {
    const CHAR_LIMIT = 250;
    const [showAlert, setShowAlert] = useState(false);

    const editor = useEditor({
        content: '',
        extensions: [
            StarterKit.configure({
                paragraph: {
                    HTMLAttributes: {
                        style: 'min-height: 100px; padding: 10px;',
                    },
                },
            }),
            CharacterCount.configure({
                limit: CHAR_LIMIT,
            }),
            TiptapTypography,
        ],
    }) as Editor;

    const formatOptions = [
        {
            name: '굵게',
            command: 'bold',
            icon: <FormatBoldIcon />,
            onclick: () => {
                editor.chain().focus().toggleBold().run();
            },
        },
        {
            name: '기울임',
            command: 'italic',
            icon: <FormatItalicIcon />,
            onclick: () => {
                editor.chain().focus().toggleItalic().run();
            },
        },
        {
            name: '인용',
            command: 'blockquote',
            icon: <FormatQuoteIcon />,
            onclick: () => {
                editor.chain().focus().toggleBlockquote().run();
            },
        },
    ];
    const toolOptions = [
        {
            name: '모두선택',
            command: 'selectAll',
            icon: <SelectAllIcon />,
            onclick: () => {},
        },
        {
            name: '이모지',
            command: 'emoji',
            icon: <InsertEmoticonIcon />,
            onclick: () => {},
        },
        {
            name: '사진',
            command: 'image',
            icon: <InsertPhotoIcon />,
            onclick: () => {},
        },
        {
            name: '링크',
            command: 'link',
            icon: <InsertLinkIcon />,
            onclick: () => {},
        },
    ];

    const handleSubmit = () => {
        if (editor.isEmpty) {
            return setShowAlert(true);
        }
        const content = editor.getHTML();
        console.log(content);
        editor.commands.clearContent();
    };

    return (
        <>
            <Paper
                variant="outlined"
                sx={{ width: '100%', maxWidth: 900, borderRadius: 4 }}
            >
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 0, sm: 1 }}
                    width={'100%'}
                    p={1.5}
                >
                    <Paper
                        variant="outlined"
                        sx={{ width: '100%', borderRadius: 3 }}
                    >
                        <Stack direction={'row'} p={0.5} width={'100%'}>
                            <Box id={'editor'} width={'100%'} minHeight={100}>
                                {editor?.isEmpty && !editor?.isFocused && (
                                    <Box
                                        component={'span'}
                                        color={'primary.light'}
                                        position={'absolute'}
                                        p={1}
                                    >
                                        {'리프를 작성해 보세요 🌿'}
                                    </Box>
                                )}
                                <EditorContent editor={editor} />
                                {editor && (
                                    <BubbleMenu
                                        editor={editor}
                                        tippyOptions={{ duration: 100 }}
                                    >
                                        <ToggleButtonGroup>
                                            {formatOptions.map((option) => (
                                                <ToggleButton
                                                    size="small"
                                                    sx={{
                                                        bgcolor:
                                                            'secondary.main',
                                                        p: 0.5,
                                                        '&:hover': {
                                                            bgcolor:
                                                                'secondary.dark',
                                                        },
                                                    }}
                                                    key={option.command}
                                                    value={option.command}
                                                    onClick={option.onclick}
                                                    className={
                                                        editor.isActive(
                                                            option.command
                                                        )
                                                            ? 'is-active'
                                                            : ''
                                                    }
                                                >
                                                    {option.icon}
                                                </ToggleButton>
                                            ))}
                                        </ToggleButtonGroup>
                                    </BubbleMenu>
                                )}
                            </Box>
                            <ToggleButtonGroup
                                size="small"
                                orientation={'vertical'}
                                aria-label="editor tools"
                            >
                                {toolOptions.map((option) => (
                                    <ToggleButton
                                        key={option.command}
                                        value={option.command}
                                        aria-label={option.command}
                                        onClick={option.onclick}
                                        sx={{ borderRadius: 2 }}
                                    >
                                        {option.icon}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </Stack>
                        <Divider />
                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            p={1}
                        >
                            <Box fontSize={'14px'}>{'사진 / 링크 프리뷰'}</Box>
                            <Typography fontSize={'14px'}>
                                {`${
                                    editor?.storage.characterCount.characters() ||
                                    0
                                }/${CHAR_LIMIT} 자`}
                            </Typography>
                        </Stack>
                    </Paper>
                    <Stack
                        direction={'column'}
                        spacing={1}
                        alignItems={{ xs: 'flex-end', sm: 'center' }}
                        justifyContent={'space-between'}
                    >
                        <Avatar
                            sx={{
                                bgcolor: 'primary.light',
                                color: 'secondary.main',
                                display: { xs: 'none', sm: 'flex' },
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{ borderRadius: 4.5, fontWeight: 600 }}
                        >
                            {'리프'}
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
            <Fade
                in={showAlert}
                addEndListener={() =>
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 2000)
                }
            >
                <Alert
                    severity="error"
                    sx={{ width: '100%', maxWidth: 900, borderRadius: 2 }}
                >
                    {'내용을 입력해 주세요.'}
                </Alert>
            </Fade>
        </>
    );
};
