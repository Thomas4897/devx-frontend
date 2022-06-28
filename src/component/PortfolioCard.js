import React from 'react';
import { Bookmark, Heart, Share } from 'tabler-icons-react';
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

// interface ArticleCardProps {
//   image: string;
//   link: string;
//   title: string;
//   description: string;
//   rating: string;
//   author: {
//     name: string;
//     image: string;
//   };
// }

// const exampleCard = [{
//     "image": "https://i.imgur.com/Cij5vdL.png",
//     "link": "https://mantine.dev/",
//     "title": "Resident Evil Village review",
//     "rating": "outstanding",
//     "description": "Resident Evil Village is a direct sequel to 2017’s Resident Evil 7, but takes a very different direction to its predecessor, namely the fact that this time round instead of fighting against various mutated zombies, you’re now dealing with more occult enemies like werewolves and vampires.",
//     "author": {
//       "name": "Bill Wormeater",
//       "image": "https://images.unsplash.com/photo-1593229874334-90d965f27c42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
//     }
//   }]

export default function PortfolioCard(props) {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const {
    className,
    image,
    link,
    title,
    description,
    author,
    rating,
    ...others
  } = props.exampleCard;
  const linkProps = { href: link, target: '_blank', rel: 'noopener noreferrer' };


  return (
    <Card style={{maxWidth: "400px"}} minwithBorder radius="md" className={cx(classes.card, className)} {...others}>
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

      <Group position="apart" className={classes.footer}>
        <Center>
          <Avatar src={author.image} size={24} radius="xl" mr="xs" />
          <Text size="sm" inline>
            {author.name}
          </Text>
        </Center>

        <Group spacing={8} mr={0}>
          <ActionIcon className={classes.action} style={{ color: theme.colors.red[6] }}>
            <Heart size={16} />
          </ActionIcon>
          <ActionIcon className={classes.action} style={{ color: theme.colors.yellow[7] }}>
            <Bookmark size={16} />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <Share size={16} />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}