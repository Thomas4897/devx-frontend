import React from 'react';
import { Heart, Heartbeat, HeartBroken, HeartOff, HeartPlus, UserCircle } from 'tabler-icons-react';
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  useMantineTheme,
  createStyles,
} from '@mantine/core';
import APIaxios from '../Axios';
import { useUser } from '../redux/userState';

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  rating: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: 'none',
  },

  title: {
    display: 'block',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs / 2,
  },

  action: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}));

export default function PortfolioCard(props) {
  const { user } = useUser();
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const {
    id,
    className,
    image,
    link,
    title,
    description,
    author,
    rating,
  } = props.exampleCard;
  const authorImage = props.image
  const linkProps = { href: link, target: '_blank', rel: 'noopener noreferrer' };
  // console.log('props.userFavorites:', props.userFavorite)

  const handleOnHeartClick = async () => {
    APIaxios.post('/users/add-to-user-favorites', {
        portfolioItemId: id,
    })
      .then((response) => {
        // Put the resulting user data in react context over the entire application
        // That it can be accessed from any component in the component tree.
        // console.log('login:', response.data)
        console.log(response.data.message);
        props.setUpdatedFavorites(!props.updateFavorites);
      }).catch((error) => {
        console.log('Error could not add to favorites.');
        console.log('error:', error);
      });
  }

  return (
    <Card style={{border: "1px solid gray", display: "flex", flexDirection: "column", height: "500px", maxWidth: "400px"}}  radius="md" className={cx(classes.card, className)} >
      <Card.Section>
        <a {...linkProps}>
          <Image src={image} height={300} />
        </a>
      </Card.Section>

      <Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
        {rating}
      </Badge>

      <Text className={classes.title} weight={500} component="a" {...linkProps}>
        {title}
      </Text>

      <Text size="sm" color="dimmed" lineClamp={4}>
        {description}
      </Text>

      <Group style={{ flex: "1", alignItems: "flex-end"}} position="apart" className={classes.footer}>
        <Center>
          <Avatar src={authorImage ? authorImage : UserCircle} size={24} radius="xl" mr="xs" />
          <Text size="sm" inline>
            {author.authorName} 
          </Text>
        </Center>

        <Group spacing={8} mr={0}>
          <ActionIcon 
          className={classes.action} 
          style={{ color: theme.colors.red[6] 
          }}
          onClick={() => {
            handleOnHeartClick()
            // console.log("Heart Click", props.exampleCard.id)
          }}
          >
           {user && props.homePage ? <HeartPlus fill={props.userFavorites ? (props.userFavorites.includes(id) ? "red" : "") : ""} size={16} /> : ""}
          </ActionIcon>
          {/* <ActionIcon className={classes.action} style={{ color: theme.colors.yellow[7] }}>
            <Bookmark size={16} />
          </ActionIcon> */}
          {/* <ActionIcon className={classes.action}>
            <Share size={16} />
          </ActionIcon> */}
        </Group>
      </Group>
    </Card>
  );
}