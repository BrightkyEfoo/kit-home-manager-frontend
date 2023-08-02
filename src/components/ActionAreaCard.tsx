import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

type Props = {
    image : string,
    name : string,
    desc : string
}

const ActionAreaCard : React.FC<Props> = ({image , name, desc}) => {
  return (
    <Card sx={{ maxWidth: 345, width : '45%' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="image"
          sx={{
            objectFit:'contain'
          }}
        />
        <CardContent>
          <Typography fontSize={16} gutterBottom variant="h5" component="div" textAlign={'center'}>
            {name}
          </Typography>
          <Typography textAlign={'justify'} variant="body2" color="text.secondary">
            {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ActionAreaCard