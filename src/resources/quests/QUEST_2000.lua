QUEST_2000 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000001',
	character = 'MaFl_Mikyel',
	end_character = 'MaFl_Mikyel',
	start_requirements = {
		min_level = 7,
		max_level = 11,
		job = { 'JOB_VAGRANT' },
		previous_quest = '',
	},
	rewards = {
		gold = 3500,
		exp = 70,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_CHUPIM', quantity = 5, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000002',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000003',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000004',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000005',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000006',
		},
	}
}
