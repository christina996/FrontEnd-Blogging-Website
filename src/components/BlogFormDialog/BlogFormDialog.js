import React, { Fragment, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import { object, string } from 'yup';
import { toast } from 'react-toastify';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import useStyles from './BlogFormDialogStyle';
import { addBlog, updateBlog } from '../../Api/blog';

const BlogSchema = object().shape({
  title: string()
    .min(3, 'title needs to be at least 3 characters!')
    .required('Blog title is required!'),
  body: string()
    .min(20, 'Body needs to be at least 20 characters!')
    .required('Body is required!'),
  tags: string().trim().notRequired(),
  photo: string().required(),
});

const BlogFormDialog = ({
  isEdit,
  token,
  editingBlog,
  getNewBlogs,
  updateBlogById,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(false);
  var formData = new FormData();

  const { handleSubmit, register, errors } = useForm({
    validationSchema: BlogSchema,
    mode: 'onBlur',
  });
  const onSubmit = async (data) => {
    setDisabledBtn(true);
    if (file) {
      formData.append('photo', file);
    }
    formData.append('title', data.title);
    formData.append('body', data.body);
    formData.append('tags', data.tags);
    if (!isEdit && token) {
      const { data } = await addBlog(formData);
      toast.success(` ${data.message}`);
      getNewBlogs();
    } else if (isEdit && token) {
      const { data } = await updateBlog(editingBlog._id, formData);
      toast.success(`${data.message}`);
      updateBlogById(data.blog);
    }
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (isEdit) setFileName(editingBlog?.photo?.replace('/uploads/', ''));
  }, []);
  const handelFileUpload = (data) => {
    console.log(data.target.files[0]);
    debugger;
    const fileImage = data.target.files[0];
    const reader = new FileReader();
    console.log(fileImage);
    reader.readAsDataURL(fileImage);
    reader.onloadend = () => {
      setFile(fileImage);
      setFileName(fileImage.name);
    };
  };

  return (
    <Fragment>
      <Fab
        className={classes.addBtn}
        color={isEdit ? 'secondary' : 'primary'}
        aria-label={isEdit ? 'edit' : 'add'}
        onClick={handleClickOpen}
      >
        {isEdit ? <EditIcon /> : <AddIcon />}
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {' '}
          {isEdit ? 'Edit Blog' : 'Add New Blog'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate encType="true">
            <TextField
              id="title"
              name="title"
              label="Blog Title"
              type="text"
              defaultValue={isEdit ? editingBlog?.title : ''}
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title?.message}
              inputRef={register}
            />
            <TextField
              id="body"
              name="body"
              label="Blog body"
              defaultValue={isEdit ? editingBlog?.body : ''}
              multiline
              rows="10"
              fullWidth
              margin="normal"
              error={!!errors.body}
              helperText={errors.body?.message}
              inputRef={register}
            />
            <TextField
              id="tags"
              name="tags"
              label="Enter Blog Tags Separated By ',' "
              defaultValue={isEdit ? editingBlog?.tags?.join(',') : ''}
              multiline
              fullWidth
              margin="normal"
              inputRef={register}
            />
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              name="photo"
              multiple
              type="file"
              onChange={handelFileUpload}
            />
            <label htmlFor="contained-button-file">
              <TextField
                value={fileName}
                id="photo"
                name="photo"
                className={classes.inputFile}
                inputRef={register}
                error={!!errors.photo}
                helperText={errors.photo?.message}
              />
              <Button
                variant="contained"
                color="default"
                className={classes.btnUpload}
                component="span"
              >
                Upload
              </Button>
            </label>
            <Button
              type="submit"
              color={isEdit ? 'secondary' : 'primary'}
              className={classes.submitBtn}
              variant="contained"
              disabled={disabledBtn}
            >
              {isEdit ? 'Save' : 'Add'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});
export default connect(mapStateToProps)(BlogFormDialog);
