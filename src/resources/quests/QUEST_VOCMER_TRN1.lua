QUEST_VOCMER_TRN1 = {
	title = 'IDS_PROPQUEST_INC_000685',
	character = 'MaFl_Mustang',
	end_character = 'MaFl_Andy',
	start_requirements = {
		min_level = 15,
		max_level = 15,
		job = { 'JOB_VAGRANT' },
		previous_quest = 'QUEST_VOCMER_BFTRN',
	},
	rewards = {
		gold = 1500,
		exp = 0,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_TWINKLESTONE', quantity = 5, sex = 'Any', remove = true },
		},
	},
	drops = {
		{
			item_id = 'II_GEN_GEM_GEM_TWINKLESTONE',
			probability = '3000000000',
			monsters = {
				'MI_AIBATT1',
				'MI_AIBATT2',
				'MI_AIBATT3',
				'MI_AIBATT4'
			}
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000686',
			'IDS_PROPQUEST_INC_000687',
			'IDS_PROPQUEST_INC_000688',
			'IDS_PROPQUEST_INC_000689',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000690',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000691',
		},
		completed = {
			'IDS_PROPQUEST_INC_000692',
			'IDS_PROPQUEST_INC_000693',
			'IDS_PROPQUEST_INC_000694',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000695',
		},
	}
}
