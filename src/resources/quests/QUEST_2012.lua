QUEST_2012 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000133',
	character = 'MaFl_Mikyel',
	end_character = 'MaFl_Mikyel',
	start_requirements = {
		min_level = 23,
		max_level = 26,
		job = { 'JOB_ASSIST', 'JOB_MERCENARY', 'JOB_MAGICIAN', 'JOB_ACROBAT' },
		previous_quest = '',
	},
	rewards = {
		gold = 11500,
		exp = 5145,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_MIADOLL', quantity = 17, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000134',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000135',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000136',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000137',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000138',
		},
	}
}
