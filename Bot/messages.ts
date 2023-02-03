export const header = {
    type: "header",
    text: {
        type: "plain_text",
        text: "Какую пиццу вы хотите заказать?",
        emoji: true,
    },
};
export const title = {
    type: "input",
    block_id: "title_block",
    element: {
        type: "plain_text_input",
        action_id: "title",
    },
    label: {
        type: "plain_text",
        text: "Название",
        emoji: true,
    },
};

export const size = {
    type: "input",
    block_id: "size_block",
    element: {
        type: "radio_buttons",
        action_id: "size",
        initial_option: {
            text: {
                type: "plain_text",
                text: "18 см",
                emoji: true,
            },
            value: "18 см",
        },
        options: [
            {
                text: {
                    type: "plain_text",
                    text: "18 см",
                    emoji: true,
                },
                value: "18 см",
            },
            {
                text: {
                    type: "plain_text",
                    text: "25 см",
                    emoji: true,
                },
                value: "25 см",
            },
            {
                text: {
                    type: "plain_text",
                    text: "30 см",
                    emoji: true,
                },
                value: "30 см",
            },
            {
                text: {
                    type: "plain_text",
                    text: "35 см",
                    emoji: true,
                },
                value: "35 см",
            },
        ],
    },
    label: {
        type: "plain_text",
        text: "Размер",
        emoji: true,
    },
};

export const dough = {
    type: "input",
    block_id: "dough_block",
    element: {
        type: "radio_buttons",
        action_id: "dough",
        initial_option: {
            text: {
                type: "plain_text",
                text: "Тонкое",
                emoji: true,
            },
            value: "Тонкое",
        },
        options: [
            {
                text: {
                    type: "plain_text",
                    text: "Тонкое",
                    emoji: true,
                },
                value: "Тонкое",
            },
            {
                text: {
                    type: "plain_text",
                    text: "Толстое",
                    emoji: true,
                },
                value: "Толстое",
            },
        ],
    },
    label: {
        type: "plain_text",
        text: "Тесто",
        emoji: true,
    },
};

export const border = {
    type: "input",
    block_id: "border_block",
    element: {
        type: "radio_buttons",
        action_id: "border",
        initial_option: {
            text: {
                type: "plain_text",
                text: "Обычный",
                emoji: true,
            },
            value: "Обычный",
        },
        options: [
            {
                text: {
                    type: "plain_text",
                    text: "Обычный",
                    emoji: true,
                },
                value: "Обычный",
            },
            {
                text: {
                    type: "plain_text",
                    text: "Сырный",
                    emoji: true,
                },
                value: "Сырный",
            },
            {
                text: {
                    type: "plain_text",
                    text: "Колбасный",
                    emoji: true,
                },
                value: "Колбасный",
            },
        ],
    },
    label: {
        type: "plain_text",
        text: "Бортик",
        emoji: true,
    },
};

export const supplements = {
    optional: true,
    type: "input",
    block_id: "supplements_block",
    element: {
        type: "plain_text_input",
        action_id: "supplements",
    },
    label: {
        type: "plain_text",
        text: "Добавки",
        emoji: true,
    },
};

export const address = {
    type: "input",
    block_id: "address_block",
    element: {
        type: "plain_text_input",
        action_id: "address",
    },
    label: {
        type: "plain_text",
        text: "Адрес доставки",
        emoji: true,
    },
};

export const comment = {
    optional: true,
    block_id: "comment_block",
    type: "input",
    element: {
        multiline: true,
        type: "plain_text_input",
        action_id: "comment",
    },
    label: {
        type: "plain_text",
        text: "Комментарий",
        emoji: true,
    },
};