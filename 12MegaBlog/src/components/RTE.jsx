
import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';


export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => (
        <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        initialValue={defaultValue}
        init={{
            branding: false,
            promotion: false,
            statusbar: false,
            elementpath: false,
            resize: false,
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            // Remove content length restrictions
            max_chars: 0, // 0 = unlimited
            paste_data_images: true,
            paste_preprocess: function(plugin, args) {
                // Allow large paste operations
                return;
            },
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
                "paste", // Add paste plugin for better large content handling
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help | fullscreen",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            // Performance settings for large content
            browser_spellcheck: true,
            contextmenu: false,
            // Allow unlimited undo levels
            custom_undo_redo_levels: 50
        }}
        onEditorChange={onChange}
        />
    )}
    />

     </div>
  )
}
