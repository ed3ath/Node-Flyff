QUEST_HERORAN_TRN2 = {
	title = 'IDS_PROPQUEST_INC_000581',
	character = 'MaDa_Eliff',
	end_character = 'MaFl_Kimel',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_ACROBAT' },
		previous_quest = 'QUEST_HERORAN_TRN1',
	},
	rewards = {
		gold = 0,
		exp = 0,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_LTHYNAN', quantity = 1, sex = 'Any', remove = false },
		},
		monsters = {
			{ id = 'MI_RUBO', quantity = 1 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_LTHYNAN', monster_id = 'MI_RUBO', probability = '3000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000582',
			'IDS_PROPQUEST_INC_000583',
			'IDS_PROPQUEST_INC_000584',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000585',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000586',
		},
		completed = {
			'IDS_PROPQUEST_INC_000587',
			'IDS_PROPQUEST_INC_000588',
			'IDS_PROPQUEST_INC_000589',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000590',
		},
	}
}
