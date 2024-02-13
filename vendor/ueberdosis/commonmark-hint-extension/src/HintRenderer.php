<?php

namespace Ueberdosis\CommonMark;

use League\CommonMark\Node\Node;
use League\CommonMark\Renderer\ChildNodeRendererInterface;
use League\CommonMark\Renderer\NodeRendererInterface;
use League\CommonMark\Util\HtmlElement;

final class HintRenderer implements NodeRendererInterface
{
    /**
     * @param Hint $node
     *
     * {@inheritDoc}
     *
     * @psalm-suppress MoreSpecificImplementedParamType
     */
    public function render(Node $node, ChildNodeRendererInterface $childRenderer): \Stringable
    {
        Hint::assertInstanceOf($node);

        $attrs = $node->data->get('attributes');
        isset($attrs['class']) ? $attrs['class'] .= ' hint' : $attrs['class'] = 'hint';

        if ($type = $node->getType()) {
            $attrs['class'] = isset($attrs['class']) ? $attrs['class'] . ' ' : '';
            $attrs['class'] .= $type;
        }

        $title = $node->getTitle();
        $title = $title
            ? new HtmlElement(
                'h2',
                ['class' => 'hint-title'],
                $title,
            )
            : '';

        $content = new HtmlElement(
            'p',
            ['class' => 'hint-content'],
            $childRenderer->renderNodes($node->children())
        );

        return new HtmlElement(
            'div',
            $attrs,
            "\n" .
            $title . "\n" .
            $content .
            "\n"
        );
    }
}
