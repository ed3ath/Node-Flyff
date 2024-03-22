QUEST_2005 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000056',
	character = 'MaFl_Mikyel',
	end_character = 'MaFl_Mikyel',
	start_requirements = {
		min_level = 11,
		max_level = 13,
		job = { 'JOB_VAGRANT' },
		previous_quest = '',
	},
	rewards = {
		gold = 5500,
		exp = 194,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_POPORAM', quantity = 10, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000057',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000058',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000059',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000060',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000061',
		},
	}
}
