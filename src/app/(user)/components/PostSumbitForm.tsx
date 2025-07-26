"use client";
import { postsService } from "@/components/features/posts/services/posts-service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PostInput, postSchema } from "@/lib/validations/post.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ImageIcon, X, GripVertical } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const PostSubmitForm = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File upload limits
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_FILES = 10;
  const ALLOWED_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  const form = useForm<PostInput>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      filenames: [],
    },
  });

  const postPost = useMutation({
    mutationFn: (data: PostInput) => postsService.createPost(data),
    onSuccess: (response) => {
      form.reset({
        title: "",
        content: "",
        filenames: [],
      });

      imageUrls.forEach((url) => URL.revokeObjectURL(url));
      setSelectedImages([]);
      setImageUrls([]);
      setIsFocused(false);
      toast.success("Post created successfully");
    },
    onError: (error: any) => {
      toast.error(
        "Failed to create post: " + (error.message || "Unknown error")
      );
    },
  });

  const onSubmit = (data: PostInput) => {
    // Ensure filenames are populated from selected images
    const submissionData = {
      ...data,
      filenames: selectedImages.map((image) => image.name),
    };

    postPost.mutate(submissionData);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    // Check if adding these files would exceed the limit
    if (selectedImages.length + files.length > MAX_FILES) {
      toast.error(`Maximum ${MAX_FILES} images allowed`, {
        description: `You can only upload ${MAX_FILES} images per post`,
      });
      return;
    }

    const validFiles: File[] = [];
    const errors: string[] = [];

    files.forEach((file) => {
      // Check file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        errors.push(
          `${file.name}: Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.`
        );
        return;
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        const sizeMB = (file.size / 1024 / 1024).toFixed(1);
        errors.push(
          `${file.name}: File too large (${sizeMB}MB). Maximum size is 5MB.`
        );
        return;
      }

      // Check for duplicates
      const isDuplicate = selectedImages.some(
        (existingFile) =>
          existingFile.name === file.name && existingFile.size === file.size
      );

      if (isDuplicate) {
        errors.push(`${file.name}: File already selected.`);
        return;
      }

      validFiles.push(file);
    });

    // Show errors if any
    if (errors.length > 0) {
      toast.error("Upload Error", {
        description:
          errors[0] +
          (errors.length > 1 ? ` (+${errors.length - 1} more)` : ""),
      });
    }

    // Add valid files
    if (validFiles.length > 0) {
      const newUrls = validFiles.map((file) => URL.createObjectURL(file));

      setSelectedImages((prev) => [...prev, ...validFiles]);
      setImageUrls((prev) => [...prev, ...newUrls]);

      toast.success(
        `${validFiles.length} image${
          validFiles.length > 1 ? "s" : ""
        } uploaded successfully`
      );
    }

    // Clear the input to allow re-selecting the same files
    if (event.target) {
      event.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    // Revoke the specific object URL before removing
    if (imageUrls[index]) {
      URL.revokeObjectURL(imageUrls[index]);
    }

    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAllImages = () => {
    // Revoke all object URLs before clearing
    imageUrls.forEach((url) => URL.revokeObjectURL(url));
    setSelectedImages([]);
    setImageUrls([]);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // Drag and drop handlers for reordering
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const updatedImages = [...selectedImages];
    const updatedUrls = [...imageUrls];

    const draggedImage = updatedImages[draggedIndex];
    const draggedUrl = updatedUrls[draggedIndex];

    // Remove the dragged items from their original positions
    updatedImages.splice(draggedIndex, 1);
    updatedUrls.splice(draggedIndex, 1);

    // Insert the dragged items at the new positions
    updatedImages.splice(dropIndex, 0, draggedImage);
    updatedUrls.splice(dropIndex, 0, draggedUrl);

    setSelectedImages(updatedImages);
    setImageUrls(updatedUrls);
    setDraggedIndex(null);
  };
  const titleValue = form.watch("title");

  const shouldShowPlaceholder =
    !isFocused && (!titleValue || titleValue.trim() === "");

  return (
    <div className="w-full p-4">
      <div className="container mx-auto">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Title Field (Main textarea with avatar) */}
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem className="relative">
                  {/* Placeholder with Avatar */}
                  {shouldShowPlaceholder && (
                    <div className="absolute inset-y-0 left-0 top-0 pl-3 pointer-events-none z-10">
                      <div className="flex items-center gap-2 opacity-55 mt-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" alt="User Avatar" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div>What's on your mind?</div>
                      </div>
                    </div>
                  )}

                  {/* Main Textarea for Title */}
                  <div>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="resize-none min-h-[120px] pt-3 pb-12 border-gray-200 focus:border-blue-500"
                        placeholder={isFocused ? "Share your thoughts..." : ""}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => {
                          if (!field.value || field.value.trim() === "") {
                            setIsFocused(false);
                          }
                        }}
                      />
                    </FormControl>
                  </div>

                  <FormMessage />

                  {/* Image Upload Button */}
                  <div className="absolute bottom-3 left-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={openFileDialog}
                      className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </div>
                </FormItem>
              )}
            />

            {/* Content Field (Optional description) */}
            <FormField
              name="content"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Description (optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="resize-none min-h-[80px] border-gray-200 focus:border-blue-500"
                      placeholder="Add more details about your post..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Preview Section */}
            {selectedImages.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    {selectedImages.length} image
                    {selectedImages.length > 1 ? "s" : ""} selected
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={clearAllImages}
                    className="text-red-600 hover:text-red-700"
                  >
                    Clear all
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {selectedImages.map((image, index) => {
                    const imageUrl = imageUrls[index];

                    return (
                      <div
                        key={`${image.name}-${index}`}
                        className="relative group cursor-move"
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                      >
                        {/* Image Preview */}
                        <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 group-hover:border-blue-300 transition-colors bg-gray-100">
                          {imageUrl ? (
                            <>
                              <Image
                                src={imageUrl}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover block"
                                width={200}
                                height={200}
                              />

                              {/* Controls overlay - only appears on hover */}
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 opacity-0 group-hover:opacity-100">
                                {/* Remove button */}
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  className="absolute top-2 right-2 h-6 w-6 p-0"
                                  onClick={() => removeImage(index)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>

                                {/* Drag handle - center */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <GripVertical className="h-6 w-6 text-white" />
                                </div>
                              </div>

                              {/* Image index - always visible */}
                              <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                {index + 1}
                              </div>
                            </>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                              <span className="text-gray-500 text-sm">
                                Loading...
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Image info */}
                        <div className="mt-1 px-1">
                          <p
                            className="text-xs text-gray-500 truncate"
                            title={image.name}
                          >
                            {image.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {(image.size / 1024 / 1024).toFixed(1)} MB
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={
                postPost.isPending ||
                !titleValue?.trim() ||
                selectedImages.length === 0
              }
              className="h-10 w-full sm:max-w-32"
            >
              {postPost.isPending ? "Posting..." : "Post"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PostSubmitForm;
