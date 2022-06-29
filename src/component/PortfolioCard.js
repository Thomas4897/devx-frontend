import React from 'react';
import { Heart, UserCircle } from 'tabler-icons-react';
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
  } = props.exampleCard;
  const linkProps = { href: link, target: '_blank', rel: 'noopener noreferrer' };


  return (
    <Card style={{border: "1px solid gray", maxWidth: "400px"}}  radius="md" className={cx(classes.card, className)} >
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
          <Avatar src={author.authorImage ? author.authorImage : {UserCircle}} size={24} radius="xl" mr="xs" />
          <Text size="sm" inline>
            {author.authorName} 
          </Text>
        </Center>

        <Group spacing={8} mr={0}>
          <ActionIcon className={classes.action} style={{ color: theme.colors.red[6] }}>
            <Heart size={16} />
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