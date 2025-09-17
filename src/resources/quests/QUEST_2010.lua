QUEST_2010 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000111',
	character = 'MaFl_Mikyel',
	end_character = 'MaFl_Mikyel',
	start_requirements = {
		min_level = 19,
		max_level = 21,
		job = { 'JOB_ASSIST', 'JOB_MERCENARY', 'JOB_MAGICIAN', 'JOB_ACROBAT' },
		previous_quest = '',
	},
	rewards = {
		gold = 9500,
		exp = 4860,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_GOLDENWING', quantity = 15, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000112',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000113',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000114',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000115',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000116',
		},
	}
}
