<?php

namespace Ueberdosis\CommonMark;

use League\CommonMark\Node\Block\AbstractBlock;
use League\CommonMark\Node\StringContainerInterface;

class Hint extends AbstractBlock implements StringContainerInterface
{
    private ?string $header = '';

    protected string $literal;

    public function getTitle(): ?string
    {
        $words = $this->getHeaderWords();

        if (count($words) > 1) {
            array_shift($words);

            return join(' ', $words);
        }

        return null;
    }

    public function getType(): ?string
    {
        $words = $this->getHeaderWords();

        if (count($words) > 0) {
            return $words[0];
        }

        return null;
    }

    public function getHeaderWords(): array
    {
        return \preg_split('/\s+/', $this->header ?? '') ?: [];
    }

    public function setHeader($header)
    {
        $this->header = $header;
    }

    public function setLiteral(string $literal): void
    {
        $this->literal = $literal;
    }

    public function getLiteral(): string
    {
        return $this->literal;
    }
}
